"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDefq = void 0;
const apollo_server_express_1 = require("apollo-server-express");
// https://stackoverflow.com/questions/60747549/how-to-split-type-definitions-and-resolvers-into-separate-files-in-apollo-server
exports.userDefq = apollo_server_express_1.gql `

type Query {
    searchUser(value: String): [User!]!
    getUserLoggedin:User!
    getUser(id: String): User!
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
