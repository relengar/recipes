import { gql } from 'apollo-boost';

export const REMOVE_MY_RECIPE = gql`
    mutation RemoveRecipe($recipeId: String!) {
        removeRecipe(recipeId: $recipeId)
    }
`