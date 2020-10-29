import { gql } from 'apollo-boost';

export const ADD_MY_RECIPE = gql`
    mutation AddMyRecipe(
        # $title: String!
        # $image: String!
        # $readyInMinutes: Int!
        # $instructions: String!
        # $analyzedInstructions: [InstructionsInput!]!
        # $extendedIngredients: [IngredientInput!]
        $recipe: CreateRecipeInput!
    ) {
        addMyRecipe(
            recipe: $recipe
            # title: $title,
            # image: $image,
            # readyInMinutes: $readyInMinutes,
            # instructions: $instructions,
            # analyzedInstructions: $analyzedInstructions,
            # extendedIngredients: $extendedIngredients
        ) {
            id,
            # title,
            # image,
            # readyInMinutes,
            # instructions,
            # analyzedInstructions,
            # extendedIngredients,
        }
    }
`