import { ApolloError } from "apollo-server-koa";

export default {
    Query: {
        randomRecipes: async (parent, params, { spoonApi }) => {
            const resp = await spoonApi.getRandomRecipe();
            return resp.recipes;
        },
        recipeInstructions: async (parent, { id }, { spoonApi }) => {
            const recipes = await spoonApi.getRecipeInstructions(id);
            if (!recipes) {
                throw new ApolloError(`No recipe found for id ${id}`, '404');
            }
            return recipes;
        },
        recipesByIngredients: async (parent, { ingredients }, { spoonApi }) => {
            const recipes = await spoonApi.getRecipesForIngredients(ingredients);

            if (!recipes) {
                throw new ApolloError(`No recipes found for ingredients ${ingredients}`);
            }

            return recipes;
        },
        recipeById: async (parent, { recipeId }, { spoonApi }) => {
            const recipe = await spoonApi.getFullRecipe(recipeId);
            if (!recipe) {
                throw new ApolloError(`No recipe found for id ${recipeId}`)
            }
            return recipe;
        },
        predictIngredient: async (parent, { query }, { spoonApi }) => {
            return spoonApi.predictIngredient(query);
        }
    }
}
