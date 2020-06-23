

import { gql } from 'apollo-server-express';


// Query: search
// Mutations: add, delete. modify


export const typeDefs = gql`

type Query {
    search(track: String,page: Int):  searchResult! 
    searchUser(firstname: String, lastname: String, username: String): User!
}

type Mutation {
  create(
    username: String!
    password:  String!
    firstname: String!
    lastname: String!      
  ): Boolean 

  updateName(
    firstname: String!
    lastname: String! 
    id:String!     
  ): Boolean 

  updatePassword(
    password: String!
    id:String!
  ): Boolean 

  remove(
    id: String!
  ): Boolean 

  login(
    username: String!
    password: String!
  ): Boolean 

}

type searchResult {
    tracks: [String!]!
    total : Int!
  }
type User {
    firstname: String!
    lastname : String!
    username : String!
}

`;