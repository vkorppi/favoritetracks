

import { gql } from 'apollo-server-express';

export const typeDefs = gql`

// Query: search
// Mutations: add, delete. modify

type Query {
    search(track: String,page: Int):  searchResult! 
}

type searchResult {
    tracks: [String!]!
    total : Int!
  }

`;