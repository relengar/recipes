import { ApolloError } from 'apollo-server-koa';

export default {
    Query: {
        randomRecipes: async (parent, params, { spoonApi }) => {
            return [{
                "analyzedInstructions": [
                    {
                        "__typename": "Instructions",
                        "steps": [
                            {
                                "__typename": "Step",
                                "number": 1,
                                "step": "In a food processor combine onions, carrots, and garlic and mince well. The pieces should be very small."
                            },
                            {
                                "__typename": "Step",
                                "number": 2,
                                "step": "Heat oil in a soup pot."
                            },
                            {
                                "__typename": "Step",
                                "number": 3,
                                "step": "Add minced vegetables and saute, mixing occasionally, until just soft [7 - 10 minutes]."
                            },
                            {
                                "__typename": "Step",
                                "number": 4,
                                "step": "Add flour, poultry seasoning, turmeric, sea salt, and celery seed and stir constantly for about 30 seconds, coating the vegetables well."
                            },
                            {
                                "__typename": "Step",
                                "number": 5,
                                "step": "Pour in the broth and water."
                            },
                            {
                                "__typename": "Step",
                                "number": 6,
                                "step": "Add kombu if you are using it. Bring to boil and then simmer, covered, for 30 minutes.After 30 minutes, pour in non-dairy milk and noodles."
                            },
                            {
                                "__typename": "Step",
                                "number": 7,
                                "step": "Let simmer an additional 10 minutes or until noodles are soft."
                            },
                            {
                                "__typename": "Step",
                                "number": 8,
                                "step": "Remove from heat and serve immediately."
                            }
                        ]
                    }
                ],
                "extendedIngredients": [
                    {
                        "__typename": "Ingredient",
                        "amount": 4,
                        "id": "11124",
                        "original": "4 - 6 carrots",
                        "unit": ""
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 1,
                        "id": "2007",
                        "original": "dash of celery seed",
                        "unit": "dash"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 1,
                        "id": "1034053",
                        "original": "1 tbsp. extra virgin olive oil",
                        "unit": "tbsp"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 4,
                        "id": "11215",
                        "original": "4 - 6 cloves of garlic",
                        "unit": "cloves"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 0.25,
                        "id": "93620",
                        "original": "1/4 c. gluten-free all-purpose flour",
                        "unit": "c"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 0.5,
                        "id": "11445",
                        "original": "1/2 piece of kombu",
                        "unit": "piece"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 2,
                        "id": "11282",
                        "original": "2 small onions",
                        "unit": "small"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 2,
                        "id": "2034",
                        "original": "2 tsp. poultry seasoning",
                        "unit": "tsp"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 0.5,
                        "id": "93761",
                        "original": "1/2 c. rice milk",
                        "unit": "c"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 4,
                        "id": "20133",
                        "original": "4 ounces Asian rice noodles",
                        "unit": "ounces"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 2,
                        "id": "1012047",
                        "original": "2 tsp. Real Salt sea salt",
                        "unit": "tsp"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 2,
                        "id": "2043",
                        "original": "2 tsp. turmeric",
                        "unit": "tsp"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 4,
                        "id": "6615",
                        "original": "4 c. organic, gluten-free chicken or vegetable broth",
                        "unit": "c"
                    },
                    {
                        "__typename": "Ingredient",
                        "amount": 4,
                        "id": "14412",
                        "original": "4 c. water",
                        "unit": "c"
                    }
                ],
                "id": "646974",
                "image": "https://spoonacular.com/recipeImages/646974-556x370.jpg",
                "title": "Homemade Creamy Ramen Soup"
            }]
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
            // return [{name: 'salt'}, {name: 'honey'}, {name: 'rum'}]
            return spoonApi.predictIngredient(query);
        }
    }
}
