"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackDefm = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.trackDefm = apollo_server_express_1.gql `

extend type Mutation {
  addTrackToList(
    tracks: [String!]!
  ): String 

  removeItem(
    tracks: [String!]!
  ): String 
}

`;
