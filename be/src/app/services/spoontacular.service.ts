// const axios = require('axios');
import axios, { AxiosRequestConfig, Method } from 'axios';
import { UserInputError, ApolloError } from 'apollo-server-koa';
export class SpoontacularService {
    private baseUrl = 'https://api.spoonacular.com'

    private async req<T>(config: Partial<AxiosRequestConfig>): Promise<T> {
        const url = config.url ? config.url : '/';
        const reqConfig = {
            method: 'GET' as Method,
            ...config,
            baseURL: this.baseUrl,
            url: this.adjustUrl(url),
        }
        const resp = await axios.request(reqConfig).catch(err => {
            console.log(err);
            throw new ApolloError(err.message, err.status);
        });
        return resp.data;
    }

    public getRecipeInstructions<T>(id: string): Promise<T> {
        return this.req({
            url: `/recipes/${id}/analyzedInstructions?stepBreakdown=false`
        });
    }

    public getRandomRecipe<T>(tags: string[] = ['pasta'], amount: number = 1): Promise<T> {
        if (isNaN(parseInt(amount.toString(), 10))) {
            throw new UserInputError('Amount must be a number');
        }
        return this.req({
            url: `/recipes/random/?number=${amount}&tags=${tags.join(',')}`
        })
    }

    public getRecipesForIngredients<T>(ingredients: string[]): Promise<T> {
        const url = `/recipes/findByIngredients?ingredients=${ingredients.join(',')}&number=5&limitLicense=false&ranking=1&ignorePantry=true`
        return  this.req({
            url
        })
    }

    public getFullRecipe<T>(recipeId): Promise<T> {
        const url = `/recipes/${recipeId}/information?includeNutrition=false`
        return this.req({
            url
        });
    }

    public predictIngredient(query: string) {
        const url = `/food/ingredients/autocomplete?query=${query}&number=5&metaInformation=true`;
        return this.req({
            url
        });
    }

    private adjustUrl(url: string): string {
        const apiKey = process.env.SPOONTACULAR_API_KEY;
        let finalPath = url ? url : '/';
        finalPath = finalPath.indexOf('?') === -1 ? `${finalPath}?apiKey=${apiKey}` : `${finalPath}&apiKey=${apiKey}`;
        return encodeURI(finalPath);
    }
}
