"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("../src/graphql/resolvers");
const typeDefinitions_1 = require("../src/graphql/typeDefinitions");
const typeparsers_1 = __importDefault(require("../src/utils/typeparsers"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envFunctions_1 = require("./utils/envFunctions");
const user_1 = __importDefault(require("./services/user"));
var cors = require('cors');
dotenv_1.default.config();
var path = require('path');
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    let dbUrl;
    if (process.env.ENVIR === 'test') {
        dbUrl = process.env.DBTEST;
    }
    else {
        dbUrl = process.env.DATABASE;
    }
    const envError = 'database url was not a string';
    const parsedUrl = typeparsers_1.default.parseString(dbUrl, envError);
    const configuration = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };
    yield mongoose_1.default.connect(parsedUrl, configuration);
});
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefinitions_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
        if (req) {
            const { secret } = envFunctions_1.getSessionEnvs();
            const auth = req.headers.authorization;
            const hasAuthHeader = auth ? auth.startsWith('bearer ') : false;
            let encodedToken;
            if (hasAuthHeader) {
                encodedToken = auth === null || auth === void 0 ? void 0 : auth.replace('bearer ', '');
                const decodedToken = jsonwebtoken_1.default.verify(encodedToken, secret);
                const userdata = user_1.default.getUser(decodedToken.id);
                return userdata.then(response => {
                    return response;
                });
            }
        }
        return '';
    }),
    formatError: (err) => {
        const userError = /userInput:.*|Unauthorized action/i;
        console.log(err.message);
        if (!userError.test(err.message)) {
            return new Error('Internal server error');
        }
        else {
            return new Error(err.message);
        }
        return err;
    }
});
const app = express_1.default();
app.use(cors());
app.use(express_1.default.static('build'));
app.get('/login', function (_req, res) {
    res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});
app.get('/favorites', function (_req, res) {
    res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});
app.get('/details/*', function (_req, res) {
    res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});
app.get('/details', function (_req, res) {
    res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});
app.get('/users', function (_req, res) {
    res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});
app.get('/registaration', function (_req, res) {
    res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});
server.applyMiddleware({ app });
const port = typeparsers_1.default.parseNumber(process.env.PORT, 'Enviroment variable: variable was not a number');
void connectToDatabase();
app.listen({ port: port }, () => console.log(`Server ready at https://favoritetracks.herokuapp.com/${server.graphqlPath}`));
