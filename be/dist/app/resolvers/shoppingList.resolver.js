"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const main_1 = require("../../main");
exports.default = {
    Query: {
        getUserShoppingLists: async (parent, { userId }, { models: { shoppingListModel }, user }) => {
            return await shoppingListModel.find({ user: { _id: userId } });
        },
        getShoppingListById: async (parent, { id }, { models: { shoppingListModel } }) => {
            return await shoppingListModel.findById(id);
        }
    },
    Mutation: {
        createShoppingList: async (parent, { ingredients, recipeId, recipeTitle }, { models: { shoppingListModel, userModel }, user }) => {
            if (!user) {
                throw new apollo_server_koa_1.ApolloError(`No user found with this id`, '403');
            }
            const shoppingList = await shoppingListModel.create({
                recipeId,
                recipeTitle,
                ingredients: ingredients.map(ing => ({ apiId: ing.id, ...ing })),
                user,
            });
            return shoppingList;
        },
        updateShoppingList: async (parent, { ingredients, id }, { models: { shoppingListModel }, user }) => {
            var _a;
            const shoppingList = await shoppingListModel.findById(id);
            let updates = [];
            shoppingList.ingredients = shoppingList.ingredients.map(original => {
                const newData = ingredients.find(({ id: ingId }) => ingId === original.id);
                newData && updates.push(newData);
                return newData ? { ...original.toJSON(), ...newData } : original;
            });
            ((_a = user) === null || _a === void 0 ? void 0 : _a.id) && main_1.pubsub.publish('shoppingListIngredients', { shoppingListIngredients: updates, userId: user.id });
            await shoppingList.save();
            return shoppingList;
        },
    },
    Subscription: {
        // shoppingListIngredients: {
        //     subscribe: () => pubsub.asyncIterator('shoppingListIngredients')
        // },
        shoppingListIngredients: {
            subscribe: apollo_server_koa_1.withFilter(() => main_1.pubsub.asyncIterator('shoppingListIngredients'), (payload, variables) => payload.userId === variables.userId)
        }
    }
};
//# sourceMappingURL=shoppingList.resolver.js.map