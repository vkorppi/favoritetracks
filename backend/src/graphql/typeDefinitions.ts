

import { gql } from 'apollo-server-express';

export const typeDefs = gql`

type Query {
    search(track: String,page: Int):  searchResult! 
}

type searchResult {
    tracks: [String!]!
    total : Int!
  }

`;