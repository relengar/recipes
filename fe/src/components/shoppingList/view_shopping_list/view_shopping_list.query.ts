import { gql } from "apollo-boost";

export const GET_SHOPPING_LIST = gql`
  query getList($id: String!) {
    getShoppingListById(id: $id) {
      id
      recipeId
      recipeTitle
      ingredients {
        id
        original
        amount
        amountFill
        unit
      }
    }
  }
`;

export const INGREDIENTS_SUBSCRIPTION = gql`
  subscription ShoppingListIngredients(
    $userId: String!
    $shoppingListId: String!
  ) {
    shoppingListIngredients(userId: $userId, shoppingListId: $shoppingListId) {
      ingredients {
        id
        original
        amountFill
      }
    }
  }
`;
