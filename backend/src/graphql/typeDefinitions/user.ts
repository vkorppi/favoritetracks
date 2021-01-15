
import { gql } from 'apollo-server-express';


// https://stackoverflow.com/questions/60747549/how-to-split-type-definitions-and-resolvers-into-separate-files-in-apollo-server


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

`;



export default {
  userQuery,
  userMutation
};