

import { gql } from 'apollo-server-express';


// Query: search
// Mutations: add, delete. modify


export const typeDefs = gql`

type Query {
    search(track: String,page: Int):  searchResult! 
}

type searchResult {
    tracks: [String!]!
    total : Int!
  }
type searchResultUser {
    firstname: [String!]!
    lastname : String!
    username : String!
}

`;