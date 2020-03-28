"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
exports.default = apollo_server_koa_1.gql `
    type Recipe {
        id: ID!
        title: String!
        image: String!
        readyInMinutes: Int!
        instructions: String!
        analyzedInstructions: [Instructions!]!
        extendedIngredients: [Ingredient]
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

    type Step {
        number: Int!
        step: String!
        ingredients: StepIngredient
        length: StepLength!
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
    }
`;
//# sourceMappingURL=recipe.schema.js.map