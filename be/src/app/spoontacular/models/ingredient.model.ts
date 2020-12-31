import { Field, Float, ID, ObjectType } from "type-graphql";
import "reflect-metadata";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class Ingredient {
  @Field(() => ID)
  id: string;

  @prop({ type: Number, required: true })
  @Field()
  public apiId: number;

  @prop()
  @Field({ nullable: true })
  name: string;

  @prop()
  @Field()
  original: string;

  @prop()
  @Field(() => Float)
  amount: number;

  @prop()
  @Field(() => Float, { nullable: true, defaultValue: 0 })
  amountFill: number;

  @prop()
  @Field()
  unit: string;
}
