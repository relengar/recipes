"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
exports.default = {
    Query: {
        randomRecipes: async (parent, params, { spoonApi }) => {
            const resp = await spoonApi.getRandomRecipe();
            return resp.recipes;
        },
        recipeInstructions: async (parent, { id }, { spoonApi }) => {
            const recipes = await spoonApi.getRecipeInstructions(id);
            if (!recipes) {
                throw new apollo_server_koa_1.ApolloError(`No recipe found for id ${id}`, '404');
            }
            return recipes;
        },
        recipesByIngredients: async (parent, { ingredients }, { spoonApi }) => {
            const recipes = await spoonApi.getRecipesForIngredients(ingredients);
            if (!recipes) {
                throw new apollo_server_koa_1.ApolloError(`No recipes found for ingredients ${ingredients}`);
            }
            return recipes;
        },
        recipeById: async (parent, { recipeId }, { spoonApi }) => {
            const recipe = await spoonApi.getFullRecipe(recipeId);
            if (!recipe) {
                throw new apollo_server_koa_1.ApolloError(`No recipe found for id ${recipeId}`);
            }
            return recipe;
        },
        predictIngredient: async (parent, { query }, { spoonApi }) => {
            return spoonApi.predictIngredient(query);
        }
    }
};
//# sourceMappingURL=recipe.resolver.js.map