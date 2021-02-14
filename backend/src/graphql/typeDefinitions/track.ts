
import { gql } from 'apollo-server-express';


export const trackQuery = gql`

extend type Mutation {
  addTrackToList(
    tracks: [trackInput!]!
  ): String 

  removeItem(
    track: trackInput!
  ): String 
}

input trackInput {
  name: String!
  url: String!
  spotifUri: String!
}

`;

export const trackMutation = gql`

extend type Query {
  search(track: String,page: Int):  searchResult! 
  getList: [trackOutput!]
}

type searchResult {
  tracks: [trackExternal!]!
  total : Int!
}

type trackOutput {
  name: String!
  url: String!
  spotifUri: String!
}

type trackExternal {
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