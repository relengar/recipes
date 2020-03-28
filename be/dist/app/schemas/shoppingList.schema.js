"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
exports.default = apollo_server_koa_1.gql `
    type UserRef {
        id: ID!
    }

    input IngredientInput {
        id: ID!
        amount: Float!
        amountFill: Float
        unit: String!
        original: String!
    }

    type ShoppingList {
        id: ID!
        recipeId: Int!
        recipeTitle: String!
        user: UserRef!
        ingredients: [ShoppingListIngredeint!]!
    }

    type ShoppingListIngredeint {
        id: ID!
        apiId: Int!
        amount: Float!
        unit: String!
        original: String!
        amountFill: Float!
    }

    extend type Query {
        getUserShoppingLists(userId: String!): [ShoppingList!]!
        getShoppingListById(id: String!): ShoppingList!
    }

    extend type Mutation {
        createShoppingList(recipeId: Int!, recipeTitle: String!, ingredients: [IngredientInput!]! ): ShoppingList!
        updateShoppingList(id: String, ingredients: [IngredientInput!]!): ShoppingList!
    }

    extend type Subscription {
        shoppingListIngredients(userId: String!): [ShoppingListIngredeint]!
    }
`;
//# sourceMappingURL=shoppingList.schema.js.map