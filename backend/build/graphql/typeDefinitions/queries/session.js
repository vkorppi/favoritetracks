"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionDefq = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.sessionDefq = apollo_server_express_1.gql `

extend type Query {
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
