import { gql } from 'apollo-server-koa';

export default gql`
    type User {
        id: ID!
        name: String!
        profilePicUrl: String!
        friends: [User]
        favoriteRecipes: [Recipe!]
    }

    type Token {
      token: String!
    }
    
    extend type Query {
        user(id: ID!): User!
        users: [User!]!
        currentUser: User
        myConnections: [User!]!
    }

    extend type Mutation {
      createUser(name: String!, password: String!): User
      logIn(name: String!, password: String!): User
      logOut: Boolean
      addFriend(userId: String!): Boolean
      removeFriend(userId: String!): Boolean
      toggleLikeRecipe(recipeId: String!): [String]
    }
`
