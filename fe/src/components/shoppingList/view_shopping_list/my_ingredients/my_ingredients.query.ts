import { gql } from 'apollo-boost';

export const UPDATE_INGREDIENTS = gql`
    mutation UpdateIngredients(
        $ingredients: [IngredientInput!]!
        $id: String!
    ) {
        updateShoppingList(
            ingredients: $ingredients
            id: $id
        ) {
            ingredients {
                id
                original
                amount
                amountFill
                unit
            }
        }
    }
`
