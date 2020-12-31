import { Ingredient } from "../../spoontacular/models/ingredient.model";
import {
  ArgsType,
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
} from "type-graphql";

export enum ShoppingListTopics {
  INGREDIENTS = "INGREDIENTS",
}

@ArgsType()
export class CreateShoppingListDTO {
  @Field(() => Int)
  public recipeId: number;

  @Field()
  public recipeTitle: string;

  @Field(() => [IngredientInput])
  public ingredients: IngredientInput[];
}

@InputType()
export class IngredientInput {
  @Field()
  public id: string;

  @Field(() => Float)
  public amount: number;

  @Field(() => Float, { defaultValue: 0 })
  public amountFill: number;

  @Field()
  public unit: string;

  @Field()
  public original: string;
}

@ObjectType()
export class IngredientSubscription {
  @Field(() => [Ingredient])
  ingredients: Ingredient[];

  @Field()
  userId: string;

  @Field()
  shoppingListId: string;
}
