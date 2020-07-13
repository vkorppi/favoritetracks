"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `

type Query {
    search(track: String,page: Int):  searchResult! 
    searchUser(value: String): [User!]!
    getUser(id: String): User!
    getList: [track!]
    delegateToken(code: String,playlist: String): spotifyToken!
    getUserLoggedin:User!
    delegateRefreshedToken(refreshedToken: String!): refreshedToken!
}

type Mutation {
  create(
    username: String!
    password:  String!
    firstname: String!
    lastname: String!
    birthdate: String
    email: String
    address: String
  ): String 

  updateUser(
    firstname: String!
    lastname: String! 
    birthdate: String
    email: String
    address: String
    id:String!     
  ): String 

  updatePassword(
    password: String!
    id:String!
  ): String 

  remove(
    id: String!
  ): String 

  login(
    username: String!
    password: String!
  ): encodedToken 

  addTrackToList(
    tracks: [String!]!
  ): String 

  removeItem(
    tracks: [String!]!
  ): String 
}

type searchResult {
    tracks: [track!]!
    total : Int!
  }
type User {
    firstname: String!
    lastname : String!
    username : String!
    birthdate: String
    email:     String
    address:   String
    id       : String!
    playlist : String
    admin : Boolean
}

type encodedToken {
  value : String!
  admin : Boolean!
}

type track {
  name: String!,
  uri: String!
  external_urls:externalUrl!
}

type externalUrl {
  spotify: String!
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
