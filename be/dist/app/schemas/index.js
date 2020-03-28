"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const user_schema_1 = require("./user.schema");
const recipe_schema_1 = require("./recipe.schema");
const shoppingList_schema_1 = require("./shoppingList.schema");
const linkSchema = apollo_server_koa_1.gql `
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
exports.default = [user_schema_1.default, recipe_schema_1.default, linkSchema, shoppingList_schema_1.default];
//# sourceMappingURL=index.js.map