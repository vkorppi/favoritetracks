

import { gql } from 'apollo-server';

export const typeDefs = gql`

type Query {
    tracks(track: String,page: Int):  [String!]! 
}

`;