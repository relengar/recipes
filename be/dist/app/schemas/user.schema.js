"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
exports.default = apollo_server_koa_1.gql `
    type User {
        id: ID!
        name: String!
        profilePicUrl: String!
        friends: [User]
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
    }
`;
//# sourceMappingURL=user.schema.js.map