import { gql } from 'apollo-boost';

export const GET_RECIPE = gql`
    query GetRecipeById($recipeId: Int!) {
        recipeById(recipeId: $recipeId) {
            title
            image
            analyzedInstructions {
                steps {
                    step
                }
            }
            extendedIngredients {
                id
                original
                amount
                unit
            }
        }
    }
`