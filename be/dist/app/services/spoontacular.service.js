"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const axios = require('axios');
const axios_1 = require("axios");
const apollo_server_koa_1 = require("apollo-server-koa");
class SpoontacularService {
    constructor() {
        this.baseUrl = 'https://api.spoonacular.com';
    }
    async req(config) {
        const url = config.url ? config.url : '/';
        const reqConfig = {
            method: 'GET',
            ...config,
            baseURL: this.baseUrl,
            url: this.adjustUrl(url),
        };
        const resp = await axios_1.default.request(reqConfig).catch(err => {
            console.log(err);
            throw new apollo_server_koa_1.ApolloError(err.message, err.status);
        });
        return resp.data;
    }
    getRecipeInstructions(id) {
        return this.req({
            url: `/recipes/${id}/analyzedInstructions?stepBreakdown=false`
        });
    }
    getRandomRecipe(tags = ['pasta'], amount = 1) {
        if (isNaN(parseInt(amount.toString(), 10))) {
            throw new apollo_server_koa_1.UserInputError('Amount must be a number');
        }
        return this.req({
            url: `/recipes/random/?number=${amount}&tags=${tags.join(',')}`
        });
    }
    getRecipesForIngredients(ingredients) {
        const url = `/recipes/findByIngredients?ingredients=${ingredients.join(',')}&number=5&limitLicense=false&ranking=1&ignorePantry=true`;
        return this.req({
            url
        });
    }
    getFullRecipe(recipeId) {
        const url = `/recipes/${recipeId}/information?includeNutrition=false`;
        return this.req({
            url
        });
    }
    predictIngredient(query) {
        const url = `/food/ingredients/autocomplete?query=${query}&number=5&metaInformation=true`;
        return this.req({
            url
        });
    }
    adjustUrl(url) {
        const apiKey = process.env.SPOONTACULAR_API_KEY;
        let finalPath = url ? url : '/';
        finalPath = finalPath.indexOf('?') === -1 ? `${finalPath}?apiKey=${apiKey}` : `${finalPath}&apiKey=${apiKey}`;
        return encodeURI(finalPath);
    }
}
exports.SpoontacularService = SpoontacularService;
//# sourceMappingURL=spoontacular.service.js.map