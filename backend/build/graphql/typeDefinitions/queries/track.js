"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackDefq = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.trackDefq = apollo_server_express_1.gql `

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


`;
