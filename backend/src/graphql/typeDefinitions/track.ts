
import { gql } from 'apollo-server-express';


export const trackQuery = gql`

extend type Mutation {
  addTrackToList(
    tracks: [String!]!
  ): String 

  removeItem(
    tracks: [String!]!
  ): String 
}

`;

export const trackMutation = gql`

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

export default {
  trackQuery,
  trackMutation
};