"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionDefm = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.sessionDefm = apollo_server_express_1.gql `

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
