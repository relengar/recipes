import { gql } from 'apollo-boost';

export const GET_MY_SHOPPING_LISTS = gql`
    query GetUserShoppingLists($userId: String!){
        getUserShoppingLists(userId: $userId) {
            id
            recipeId
            recipeTitle
            ingredients {
                original
                amount
                unit
            }
        }
    }
`