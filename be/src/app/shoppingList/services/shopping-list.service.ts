import {
  IngredientInput,
  IngredientSubscription,
} from "./../models/shopping-list.dto.model";
import { shoppingListModel } from "./../models/shopping-list.model";
import { Service } from "typedi";
import { ShoppingList } from "../models/shopping-list.model";
import { CreateShoppingListDTO } from "../models/shopping-list.dto.model";
import { Publisher } from "type-graphql";

@Service()
export class ShoppingListService {
  /**
   * getShoppigListsByUser
   * @param userId {string} id of use whise shopping lists should be retrieved
   */
  public async getAllByUser(userId: string): Promise<ShoppingList[]> {
    return shoppingListModel.find({ user: { _id: userId } });
  }

  /**
   * create
   */
  public async create(
    { recipeId, recipeTitle, ingredients }: CreateShoppingListDTO,
    user
  ) {
    const shoppingList = await shoppingListModel.create({
      recipeId,
      recipeTitle,
      ingredients: ingredients.map((ing) => ({ apiId: ing.id, ...ing })) || [],
      user,
    });
    return shoppingList;
  }

  /**
   * update
   */
  public async update(
    id: string,
    ingredients: IngredientInput[],
    user,
    publish: Publisher<IngredientSubscription>
  ) {
    const shoppingList = await shoppingListModel.findById(id);
    let updates = [];
    shoppingList.ingredients = shoppingList.ingredients.map((original) => {
      const newData = ingredients.find(
        ({ id: ingId }) => ingId === original.id
      );
      newData && updates.push(newData);
      return newData ? { ...(original as any).toJSON(), ...newData } : original;
    });

    user?.id &&
      publish({
        ingredients: updates,
        userId: user.id,
        shoppingListId: shoppingList.id,
      });
    await shoppingList.save();
    return shoppingList;
  }

  /**
   * name
   */
  public async getById(id: string) {
    return shoppingListModel.findById(id);
  }
}
