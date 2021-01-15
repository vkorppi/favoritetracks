"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackMutation = exports.trackQuery = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.trackQuery = apollo_server_express_1.gql `

extend type Mutation {
  addTrackToList(
    tracks: [String!]!
  ): String 

  removeItem(
    tracks: [String!]!
  ): String 
}

`;
exports.trackMutation = apollo_server_express_1.gql `

extend type Query {
  search(track: String,page: Int):  searchResult! 
  getList: [track!]
}

type searchResult {
  tracks: [track!]!
  total : Int!
}

type track {
  name: String!,
  uri: String!
  external_urls:externalUrl!
}

type externalUrl {
  spotify: String!
}

`;
exports.default = {
    trackQuery: exports.trackQuery,
    trackMutation: exports.trackMutation
};
