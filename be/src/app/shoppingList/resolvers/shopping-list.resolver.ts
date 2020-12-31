import {
  IngredientInput,
  IngredientSubscription,
  ShoppingListTopics,
} from "./../models/shopping-list.dto.model";
import { Context } from "koa";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { CreateShoppingListDTO } from "../models/shopping-list.dto.model";
import { ShoppingList } from "../models/shopping-list.model";
import { ShoppingListService } from "../services/shopping-list.service";

@Resolver()
export class ShoppingListResolver {
  constructor(private shoppingListService: ShoppingListService) {}

  @Query(() => [ShoppingList])
  public async getUserShoppingLists(@Arg("userId") userId: string) {
    return this.shoppingListService.getAllByUser(userId);
  }

  @Query(() => ShoppingList)
  public async getShoppingListById(@Arg("id") id: string) {
    return this.shoppingListService.getById(id);
  }

  @Authorized()
  @Mutation(() => ShoppingList)
  public async createShoppingList(
    @Args() shoppngList: CreateShoppingListDTO,
    @Ctx() context: Context
  ) {
    return this.shoppingListService.create(shoppngList, context.user);
  }

  @Authorized()
  @Mutation(() => ShoppingList)
  public async updateShoppingList(
    @Arg("id") id: string,
    @Arg("ingredients", () => [IngredientInput]) ingredients: IngredientInput[],
    @Ctx() context: Context,
    @PubSub(ShoppingListTopics.INGREDIENTS)
    publish: Publisher<IngredientSubscription>
  ) {
    return this.shoppingListService.update(
      id,
      ingredients,
      context.user,
      publish
    );
  }

  @Authorized()
  @Subscription(() => IngredientSubscription, {
    topics: [ShoppingListTopics.INGREDIENTS],
    filter: ({ payload, args }) =>
      payload.userId === args.userId &&
      payload.shoppingListId === args.shoppingListId,
  })
  public shoppingListIngredients(
    @Arg("userId") userId: string,
    @Arg("shoppingListId") shoppingListId: string,
    @Root() notiPayload: IngredientSubscription
  ) {
    return notiPayload;
  }
}
