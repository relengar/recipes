import { User } from "./../../user/models/user.model";
import { Ingredient } from "./../../spoontacular/models/ingredient.model";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Schema } from "mongoose";

@ObjectType()
export class ShoppingList {
  @Field(() => ID)
  public id: string;

  @prop({ type: Number, required: true })
  @Field(() => Number)
  public recipeId: number;

  @prop({ type: String, required: false })
  @Field(() => String)
  public recipeTitle: string;

  @prop({ ref: "User", type: Schema.Types.ObjectId, required: true })
  @Field(() => User)
  public user: User;

  @prop({ type: Ingredient })
  @Field(() => [Ingredient])
  public ingredients: Ingredient[];
}

export const shoppingListModel = getModelForClass(ShoppingList);
