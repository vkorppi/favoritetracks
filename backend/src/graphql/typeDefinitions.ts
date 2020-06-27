

import { gql } from 'apollo-server-express';


export const typeDefs = gql`

type Query {
    search(track: String,page: Int):  searchResult! 
    searchUser(value: String): [User!]!
    getUser(id: String): User!
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
  ): Boolean 

  updateUser(
    firstname: String!
    lastname: String! 
    birthdate: String
    email: String
    address: String
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
    id       : String!
}


`;