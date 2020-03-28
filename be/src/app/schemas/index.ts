import { gql } from 'apollo-server-koa';
import userSchema from './user.schema';
import recipeShema from './recipe.schema'
import shoppingListSchema from './shoppingList.schema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [ userSchema, recipeShema, linkSchema, shoppingListSchema ]
