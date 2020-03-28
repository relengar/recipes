import { gql } from 'apollo-boost';

export const GET_CACHED_INPUT = gql`
    {
        ingredients @client
    }
`

export const AUTOCOMPLETE = gql`
    query Predict($query: String!) {
        predictIngredient(query: $query) {
            name
        }
    }
`

export const SET_CACHE = gql`
    mutation SetCache(
        $ingredients: [String!] @client
    ) {
        saveIngredients(ingredients: $ingredients) @client
    }
`

export const SEARCH = gql`
    query getCachedRecipes($ingredients: [String!]!) {
        recipesByIngredients(ingredients: $ingredients) 
        {
            id
            title
            missedIngredients {original, id, amount, unit}
            usedIngredients {original, id, amount, unit}
        }
    }
`
