
import { gql } from 'apollo-server-express';



export const userMutation = gql`

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
}
`;


export const userQuery = gql`

extend type Query {
  searchUser(value: String): [User!]!
  getUser(id: String): User!
  getUserLoggedin:User!
  getAuthorization:Authorization!
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

type Authorization {
  authenticated : Boolean
  admin : Boolean
}


`;



export default {
  userQuery,
  userMutation
};