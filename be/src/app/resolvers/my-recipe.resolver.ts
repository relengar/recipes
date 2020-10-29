import { ApolloError } from "apollo-server-koa";
import { UserInterface } from "../models/user.model";
import * as _ from 'lodash'

export default {
    Mutation: {
        addMyRecipe: async (parent, { recipe }, { user, authService }) => {
            const userRecord: UserInterface = await authService.getDbRecord(user?.id);
            // const userRecord: UserInterface = await authService.getDbRecord('5f4fb4995c9455597535f63d');

            const recipeExists = userRecord.favoriteRecipes.some(({ title }) => title === recipe.title)
            if (recipeExists) {
                throw new ApolloError(`You already have a recipe with title ${recipe.title}`, '409');
            }

            userRecord.favoriteRecipes.push(recipe)
            await userRecord.save().then(resp => console.log('resp: ', resp)).catch(err => console.log('err: ', err));

            return userRecord.favoriteRecipes;
        },
        removeRecipe: async (parent, { recipeId }, { user, authService }) => {
            const userRecord: UserInterface = await authService.getDbRecord(user?.id);

            // _.remove(userRecord.favoriteRecipes, recipe =>  recipe.id === recipeId)
            const recipeToRemove = userRecord.favoriteRecipes.find(({ id }) => id === recipeId)
            if (!recipeToRemove) {
                throw new ApolloError(`Recipe with id ${recipeId} not found`, '404')
            }
            recipeToRemove.remove()

            await userRecord.save().then(r => console.log('done')).catch(err => console.log(err))

            return true;
        },
        // changeRecipe: async (parent, recipeData, { user, authService }) => {
        //     const userRecord: UserInterface = await authService.getDbRecord(user?.id);

        //     const recipeIndex = userRecord.favoriteRecipes.findIndex(({ id }) => id === recipeData.id)
        //     if (recipeIndex === -1) {
        //         throw new ApolloError(`Recipe with id ${recipeData.id} not Found`, '404');
        //     }

        //     const recipe = userRecord.favoriteRecipes[recipeIndex]
        //     userRecord.favoriteRecipes[recipeIndex] = { ...recipe, ...recipeData }

        //     return { ...recipe, ...recipeData };
        // }
        
    },
    Query: {
        myRecipes: async (parent, data, { user, authService }) => {
            const userRecord: UserInterface = await authService.getDbRecord(user?.id);
            return userRecord.favoriteRecipes;
        }
        // getRecipe: async (parent, { recipeId}, { user, authService }) => {
        //     const userRecord: UserInterface = await authService.getDbRecord(user?.id);

        //     const recipe = userRecord.favoriteRecipes.find(({ id }) => id === recipeId)
        //     if (!recipe) {
        //         throw new ApolloError('User not Found', '404');
        //     }

        //     return recipe;
        // }
    }
}