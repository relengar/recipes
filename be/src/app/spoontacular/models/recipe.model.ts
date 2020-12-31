import { Field, ID, Int, ObjectType } from "type-graphql";
import "reflect-metadata";
import { Ingredient } from "./ingredient.model";
import { Instructions } from "./instruction.model";

@ObjectType()
export class Recipe {
  @Field(() => Int, { nullable: true })
  id: string;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field(() => Int, { nullable: true })
  readyInMinutes: number;

  @Field(() => [Instructions])
  analyzedInstructions: Instructions[];

  @Field(() => [Ingredient], { defaultValue: [] })
  extendedIngredients: Ingredient[];
}

@ObjectType()
export class RecipePreview {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field(() => [Ingredient], { defaultValue: [], nullable: true })
  missedIngredients: Ingredient[];

  @Field(() => [Ingredient], { defaultValue: [], nullable: true })
  usedIngredients: Ingredient[];
}

@ObjectType()
export class IngredientPreview {
  @Field()
  name: string;

  @Field(() => Int)
  id: number;
}

// gql`
//     type Recipe {
//         id: ID!
//         title: String!
//         image: String!
//         readyInMinutes: Int!
//         instructions: String!
//         analyzedInstructions: [Instructions!]!
//         extendedIngredients: [Ingredient]
//     }

//     type Ingredient {
//         id: ID!
//         name: String!
//         originalName: String!
//         amount: Float!
//         amountFill: Float
//         unit: String!
//         original: String!
//     }

//     type Instructions {
//         name: String!
//         steps: [Step!]!
//     }

//     type Step {
//         number: Int!
//         step: String!
//         ingredients: StepIngredient
//         length: StepLength!
//     }

//     type StepIngredient {
//         id: ID
//         name: String
//     }

//     type StepLength {
//         number: Int!
//         unit: String!
//     }

//     type RecipePreview {
//         id: ID!
//         title: String!
//         image: String!
//         missedIngredients: [Ingredient!]
//         usedIngredients: [Ingredient!]
//     }

//     type IngredientPreview {
//         name: String!
//         id: Int!
//     }

//     extend type Query {
//         recipeInstructions(id: String!): [Instructions!]!
//         recipes: [Recipe!]!
//         randomRecipes: [Recipe]!
//         recipesByIngredients(ingredients: [String!]!): [RecipePreview!]
//         recipeById(recipeId: Int!): Recipe!
//         predictIngredient(query: String!): [IngredientPreview!]
//     }
// `
