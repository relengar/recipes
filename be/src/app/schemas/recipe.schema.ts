import { gql } from 'apollo-server-koa';

export default gql`
    type Recipe {
        id: ID!
        title: String!
        image: String!
        readyInMinutes: Int!
        instructions: String!
        analyzedInstructions: [Instructions!]!
        extendedIngredients: [Ingredient]
    }

    input CreateRecipeInput {
        title: String!
        image: String!
        readyInMinutes: Int
        instructions: String
        analyzedInstructions: [InstructionsInput!]!
        extendedIngredients: [IngredientInput]
    }

    type Ingredient {
        id: ID!
        name: String!
        originalName: String!
        amount: Float!
        amountFill: Float
        unit: String!
        original: String!
    }

    type Instructions {
        name: String!
        steps: [Step!]!
    }

    input InstructionsInput {
        name: String
        steps: [StepInput!]!
    }

    type Step {
        number: Int!
        step: String!
        ingredients: StepIngredient
        length: StepLength!
    }

    input StepInput {
        number: Int!
        step: String!
    }

    type StepIngredient {
        id: ID
        name: String
    }

    type StepLength {
        number: Int!
        unit: String!
    }

    type RecipePreview {
        id: ID!
        title: String!
        image: String!
        missedIngredients: [Ingredient!]
        usedIngredients: [Ingredient!]
    }

    type IngredientPreview {
        name: String!
        id: Int!
    }
    
    extend type Query {
        recipeInstructions(id: String!): [Instructions!]!
        recipes: [Recipe!]!
        randomRecipes: [Recipe]!
        recipesByIngredients(ingredients: [String!]!): [RecipePreview!]
        recipeById(recipeId: Int!): Recipe!
        predictIngredient(query: String!): [IngredientPreview!]
        myRecipes: [Recipe]
    }

    extend type Mutation {
        addMyRecipe(recipe: CreateRecipeInput!): [Recipe!]
        removeRecipe(recipeId: String!): Boolean!
    }
`
