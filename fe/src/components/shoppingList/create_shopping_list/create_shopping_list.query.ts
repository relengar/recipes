import { gql } from 'apollo-boost';

export const CREATE_SHOPPING_LIST = gql`
mutation CreateShoppingList(
    $recipeTitle: String!
    $recipeId: Int!
    $ingredients: [IngredientInput!]!
) {
  createShoppingList(
      recipeId: $recipeId,
      recipeTitle: $recipeTitle,
      ingredients: $ingredients
  ){
    id,
  }
}
`