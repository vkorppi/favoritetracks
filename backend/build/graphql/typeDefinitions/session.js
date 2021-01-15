"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionQuery = exports.sessionMutation = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.sessionMutation = apollo_server_express_1.gql `

extend type Mutation {
  login(
    username: String!
    password: String!
  ): encodedToken 
}

type encodedToken {
  value : String!
  admin : Boolean!
}
  
`;
exports.sessionQuery = apollo_server_express_1.gql `

 type Query {
    delegateToken(code: String,playlist: String): spotifyToken!
    delegateRefreshedToken(refreshedToken: String!): refreshedToken!
  }

type spotifyToken {
    access_token: String!
    refresh_token: String!
    expires_in: Int!
  }

  type refreshedToken {
    access_token: String!
    token_type: String!
    expires_in: Int!
    scope: String!
  }
  
`;
exports.default = {
    sessionMutation: exports.sessionMutation,
    sessionQuery: exports.sessionQuery
};
