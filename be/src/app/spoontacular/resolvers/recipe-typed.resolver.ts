import { ApolloError } from "apollo-server-koa";
import {
  IngredientPreview,
  Recipe,
  RecipePreview,
} from "./../models/recipe.model";
import { Instructions } from "./../models/instruction.model";
import { SpoontacularService } from "../services/spoontacular.service";
import "reflect-metadata";
import { Arg, ID, Int, Query, Resolver } from "type-graphql";

@Resolver(Recipe)
export class RecipeResolver {
  constructor(private spoonApi: SpoontacularService) {}

  @Query(() => [Recipe])
  async randomRecipes() {
    const resp = await this.spoonApi.getRandomRecipe();
    return resp.recipes.map((recipe) => {
      const extendedIngredients = recipe.extendedIngredients || [];
      const analyzedInstructions = recipe.analyzedInstructions || [];
      return {
        ...recipe,
        extendedIngredients,
        analyzedInstructions,
      };
    });
  }

  @Query(() => [Instructions])
  async recipeInstructions(@Arg("id", () => ID) id: string) {
    const instructions = await this.spoonApi.getRecipeInstructions(id);
    if (!instructions) {
      throw new ApolloError(`No recipe found for id ${id}`, "404");
    }
    return instructions;
  }

  @Query(() => [RecipePreview])
  async recipesByIngredients(
    @Arg("ingredients", () => [String]) ingredients: string[]
  ) {
    const recipes = await this.spoonApi.getRecipesForIngredients(ingredients);

    if (!recipes) {
      throw new ApolloError(`No recipes found for ingredients ${ingredients}`);
    }

    return recipes;
  }

  @Query(() => Recipe)
  async recipeById(@Arg("recipeId", () => Int) recipeId: number) {
    const recipe = await this.spoonApi.getFullRecipe(recipeId);
    if (!recipe) {
      throw new ApolloError(`No recipe found for id ${recipeId}`, "404");
    }
    return recipe;
  }

  @Query(() => [IngredientPreview])
  async predictIngredient(@Arg("query") query: string) {
    return this.spoonApi.predictIngredient(query);
  }
}
