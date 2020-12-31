import { Field, ID, Int, ObjectType } from "type-graphql";
import "reflect-metadata";

@ObjectType()
export class Instructions {
  @Field()
  name: string;

  @Field(() => [Step])
  steps: Step[];
}

@ObjectType()
class StepIngredient {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
class StepLength {
  @Field(() => Int)
  number: number;

  @Field()
  unit: string;
}

@ObjectType()
class Step {
  @Field(() => Int)
  number: number;

  @Field()
  step: string;

  @Field(() => StepIngredient, { nullable: true })
  ingredients: StepIngredient;

  @Field(() => StepLength)
  length: StepLength;
}
