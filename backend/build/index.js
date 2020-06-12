"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("../src/graphql/resolvers");
const typeDefinitions_1 = require("../src/graphql/typeDefinitions");
const typeparsers_1 = __importDefault(require("../src/utils/typeparsers"));
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefinitions_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    cors: { origin: typeparsers_1.default.parseEnvString(process.env.FRONTEND) }
});
void server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
