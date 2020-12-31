import { Field, ID, ObjectType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@ObjectType()
export class User {
  @Field(() => ID)
  public id: string;

  @prop({ required: true })
  @Field()
  public name: string;

  @prop()
  @Field()
  profilePicUrl: string;

  @prop({ required: true })
  password: string;

  @prop({ type: () => Schema.Types.ObjectId, default: [], ref: User })
  @Field(() => [User], { defaultValue: [] })
  friends: User[];
}

export const userModel = getModelForClass(User);
