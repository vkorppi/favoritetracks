"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDefm = void 0;
const apollo_server_express_1 = require("apollo-server-express");
// https://stackoverflow.com/questions/60747549/how-to-split-type-definitions-and-resolvers-into-separate-files-in-apollo-server
exports.userDefm = apollo_server_express_1.gql `

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
