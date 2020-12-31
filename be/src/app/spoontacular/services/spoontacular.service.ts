// const axios = require('axios');
import axios, { AxiosRequestConfig, Method } from "axios";
import { UserInputError, ApolloError } from "apollo-server-koa";
import { Instructions } from "../models/instruction.model";
import { Service } from "typedi";
import {
  IngredientPreview,
  Recipe,
  RecipePreview,
} from "../models/recipe.model";

@Service()
export class SpoontacularService {
  private baseUrl = "https://api.spoonacular.com";

  private async req<T>(config: Partial<AxiosRequestConfig>): Promise<T> {
    const url = config.url ? config.url : "/";
    const reqConfig = {
      method: "GET" as Method,
      ...config,
      baseURL: this.baseUrl,
      url: this.adjustUrl(url),
    };
    const resp = await axios.request(reqConfig).catch((err) => {
      console.error(err);
      throw new ApolloError(err.message, err.status);
    });
    return resp.data;
  }

  public getRecipeInstructions(id: string): Promise<Instructions> {
    return this.req({
      url: `/recipes/${id}/analyzedInstructions?stepBreakdown=false`,
    });
  }

  public getRandomRecipe(
    tags: string[] = ["pasta"],
    amount: number = 1
  ): Promise<{ recipes: Recipe[] }> {
    if (isNaN(parseInt(amount.toString(), 10))) {
      throw new UserInputError("Amount must be a number");
    }
    return this.req({
      url: `/recipes/random/?number=${amount}&tags=${tags.join(",")}`,
    });
  }

  public getRecipesForIngredients(
    ingredients: string[]
  ): Promise<RecipePreview> {
    const url = `/recipes/findByIngredients?ingredients=${ingredients.join(
      ","
    )}&number=5&limitLicense=false&ranking=1&ignorePantry=true`;
    return this.req({
      url,
    });
  }

  public getFullRecipe(recipeId: number): Promise<Recipe> {
    const url = `/recipes/${recipeId}/information?includeNutrition=false`;
    return this.req({
      url,
    });
  }

  public predictIngredient(query: string): Promise<IngredientPreview> {
    const url = `/food/ingredients/autocomplete?query=${query}&number=5&metaInformation=true`;
    return this.req({
      url,
    });
  }

  private adjustUrl(url: string): string {
    const apiKey = process.env.SPOONTACULAR_API_KEY;
    let finalPath = url ? url : "/";
    finalPath =
      finalPath.indexOf("?") === -1
        ? `${finalPath}?apiKey=${apiKey}`
        : `${finalPath}&apiKey=${apiKey}`;
    return encodeURI(finalPath);
  }
}
