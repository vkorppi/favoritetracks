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
const apollo_boost_1 = __importDefault(require("apollo-boost"));
const apollo_server_express_1 = require("apollo-server-express");
require("cross-fetch/polyfill");
const mongoose_1 = __importDefault(require("mongoose"));
const typeparsers_1 = __importDefault(require("../utils/typeparsers"));
const user_1 = __importDefault(require("../mongo/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const userFunctions_1 = require("../utils/userFunctions");
const envFunctions_1 = require("../utils/envFunctions");
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
const apolloclient = new apollo_boost_1.default({
    uri: 'http://localhost:4000/graphql',
    onError: (error) => {
        console.log(error);
    }
});
describe('Testing spotify', () => {
    test('Returns names of tracks', () => __awaiter(void 0, void 0, void 0, function* () {
        const spotifyQuery = apollo_server_express_1.gql `

		query {
			search(track: "nagasaki",page: 1) 
			{
      			tracks {
					name,
					uri,
					external_urls {
						spotify
					  }
				  }
      			total
    		}
		  }`;
        const object = (yield apolloclient.query({
            query: spotifyQuery
        })).data;
        console.log(object.search.tracks);
        expect(object.search.tracks.length > 0).toBe(true);
    }));
});
describe('Testing usermanagement', () => {
    const parser = typeparsers_1.default.parseString;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const env = process.env;
        const error = 'databseurl url was not as string';
        const configuration = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
        yield mongoose_1.default.connect(parser(env.DBTEST, error), configuration);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
        const testuser = {
            username: 'usernameTest',
            password: userFunctions_1.hashPassword('passwordTest'),
            firstname: 'firstnameTest',
            lastname: 'lastnameTest'
        };
        const userTest = new user_1.default(testuser);
        yield userTest.save();
    }));
    /*
    test('User was created', async () => {

        interface createType {
            create: boolean;
        }

        const userMutation = gql`

            mutation {
                create(username: "username",password: "password",firstname:"first",lastname:"last",
                birthdate: "11.11.1999",email: "test.testi@test.com",address:"street 11")
            }
          `;

        const success = (await apolloclient.mutate({
            mutation: userMutation
        })).data as createType;

        expect(success.create).toBeTruthy();

    });
    */
    /*
    test('User was updated', async () => {


        interface updateType {
            updateUser: boolean;
        }

        const user = await User.findOne({ username: 'usernameTest' });
        const id = user?.id as string;

        const userMutation = gql`

            mutation UpdateUser($firstname: String!,$lastname: String!,$birthdate: String,
                $email: String,$address: String,$id: String!){
                updateUser(firstname:$firstname,lastname:$lastname,birthdate:$birthdate
                ,email:$email,address:$address,id:$id)
            }
          `;

        const success = (await apolloclient.mutate({
            variables: {
                firstname: 'first', lastname: 'last',
                birthdate: '11.11.2011', email: 'test.test.@test.com', address: 'street 12', id: id
            },
            mutation: userMutation,
        })).data as updateType;


        expect(success.updateUser).toBeTruthy();


    });
    */
    test('Password was updated', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ username: 'usernameTest' });
        const id = user === null || user === void 0 ? void 0 : user.id;
        const userMutation = apollo_server_express_1.gql `

			mutation UpdatePassword($password: String!,$id: String!){
				updatePassword(password:$password,id:$id) 
    		}
		  `;
        const success = (yield apolloclient.mutate({
            variables: { password: 'newpassword', id: id },
            mutation: userMutation,
        })).data;
        expect(success.updatePassword).toBeTruthy();
    }));
    /*
    test('User was removed', async () => {

        interface updateType {
            remove: boolean;
        }

        const user = await User.findOne({ username: 'usernameTest' });
        const id = user?.id as string;

        const userMutation = gql`

            mutation Remove($id: String!){
                remove(id:$id)
            }
          `;


        const success = (await apolloclient.mutate({
            variables: { id: id },
            mutation: userMutation,
        })).data as updateType;

        expect(success.remove).toBeTruthy();
    });
    */
    test('Login works', () => __awaiter(void 0, void 0, void 0, function* () {
        const username = 'usernameTest';
        const password = 'passwordTest';
        const userMutation = apollo_server_express_1.gql `

			mutation Login($username: String!,$password: String!){
				login(username:$username,password:$password) 
				{
					value
				}
    		}
		  `;
        const token = (yield apolloclient.mutate({
            variables: { username: username, password: password },
            mutation: userMutation,
        })).data;
        expect(token.login).toBeTruthy();
    }));
    test('User search works', () => __awaiter(void 0, void 0, void 0, function* () {
        const userQuery = apollo_server_express_1.gql `

		query {
			searchUser(value: "usernameTest") 
			{
				firstname,
				lastname,
				username,
				id
			  }
		  }`;
        // Voi palauttaa tyhjän talukon
        const fetcheduser = (yield apolloclient.query({
            query: userQuery
        })).data;
        expect(fetcheduser.searchUser).toBeTruthy();
    }));
    test('User can be fetched with id', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ username: 'usernameTest' });
        const id = user === null || user === void 0 ? void 0 : user.id;
        const userQuery = apollo_server_express_1.gql `

		query getUser($id: String!){
			getUser(id: $id) 
				{
					firstname,
					lastname,
					username,
					id
				}
		  }`;
        const fetcheduser = (yield apolloclient.query({
            variables: { id: id },
            query: userQuery
        })).data;
        expect(fetcheduser).toBeTruthy();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
        void mongoose_1.default.connection.close();
        console.log('Database connection closed');
    }));
});
describe('Testing  mutations and queries that require authorization header', () => {
    const parser = typeparsers_1.default.parseString;
    let clientWithHeaders;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const { secret } = envFunctions_1.getSessionEnvs();
        const env = process.env;
        const error = 'databseurl url was not as string';
        const configuration = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
        yield mongoose_1.default.connect(parser(env.DBTEST, error), configuration);
        yield user_1.default.deleteMany({});
        const testuser = {
            username: 'usernameTest',
            password: userFunctions_1.hashPassword('passwordTest'),
            firstname: 'firstnameTest',
            lastname: 'lastnameTest',
            admin: true
        };
        const userTest = new user_1.default(testuser);
        yield userTest.save();
        const token = jsonwebtoken_1.sign({ username: userTest.username, id: userTest.id }, secret);
        clientWithHeaders = new apollo_boost_1.default({
            uri: 'http://localhost:4000/graphql',
            request: config => {
                config.setContext({ headers: { authorization: `bearer ${token}`, }, });
            },
        });
    }));
    test('New tracks should be added without any failures', () => __awaiter(void 0, void 0, void 0, function* () {
        const usermutation = apollo_server_express_1.gql `

		mutation AddTrackToList($tracks: [String!]!){
			addTrackToList(tracks: $tracks) 
				
		  }`;
        const user = yield user_1.default.findOne({ username: 'usernameTest' });
        const id = user === null || user === void 0 ? void 0 : user.id;
        const success = yield clientWithHeaders.mutate({
            variables: {
                tracks: [
                    'spotify:track:59LSFQW38CnzJylvtYJKJu',
                    'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
                ], userId: id
            },
            mutation: usermutation
        });
        const content = success;
        expect(content.data.addTrackToList).toBeTruthy();
    }));
    test("Query returns user's favorites", () => __awaiter(void 0, void 0, void 0, function* () {
        const favoritesQuery = apollo_server_express_1.gql `

		query {
			getList {
				name,
				uri
			}
		}`;
        const fetcheduser = (yield clientWithHeaders.query({
            query: favoritesQuery
        }));
        const items = fetcheduser.data.getList;
        expect(items.length).toBe(2);
    }));
    test("Mutation removes tracks", () => __awaiter(void 0, void 0, void 0, function* () {
        const RemoveTracksmutation = apollo_server_express_1.gql `

		mutation removeItem($tracks: [String!]!){
			removeItem(tracks: $tracks) 
				
		  }`;
        const success = yield clientWithHeaders.mutate({
            variables: {
                tracks: [
                    'spotify:track:59LSFQW38CnzJylvtYJKJu',
                    'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
                ]
            },
            mutation: RemoveTracksmutation
        });
        const content = success;
        expect(content.data.removeItem).toBeTruthy();
    }));
    test("Query returns userojbect", () => __awaiter(void 0, void 0, void 0, function* () {
        const loggedinUser = apollo_server_express_1.gql `

		query {
			getUserLoggedin {
				
					firstname,
					lastname,
					username,
					id
				
			}
		}`;
        const fetcheduser = (yield clientWithHeaders.query({
            query: loggedinUser,
        }));
        const user = fetcheduser.data.getUserLoggedin;
        expect(user).toBeTruthy();
    }));
    test('User was created', () => __awaiter(void 0, void 0, void 0, function* () {
        const userMutation = apollo_server_express_1.gql `

			mutation {
				create(username: "username",password: "password",firstname:"first",lastname:"last",
				birthdate: "11.11.1999",email: "test.testi@test.com",address:"street 11") 
    		}
		  `;
        const success = (yield clientWithHeaders.mutate({
            mutation: userMutation
        })).data;
        expect(success.create).toBeTruthy();
        let message = '';
        try {
            yield apolloclient.mutate({
                mutation: userMutation,
            });
        }
        catch (error) {
            const test = error;
            message = test.message;
        }
        expect(message).toContain('Unauthorized action');
    }));
    test('User was updated', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ username: 'usernameTest' });
        const id = user === null || user === void 0 ? void 0 : user.id;
        const userMutation = apollo_server_express_1.gql `

			mutation UpdateUser($firstname: String!,$lastname: String!,$birthdate: String,
				$email: String,$address: String,$id: String!){
				updateUser(firstname:$firstname,lastname:$lastname,birthdate:$birthdate
				,email:$email,address:$address,id:$id) 
    		}
		  `;
        const success = (yield clientWithHeaders.mutate({
            variables: {
                firstname: 'first', lastname: 'last',
                birthdate: '11.11.2011', email: 'test.test.@test.com', address: 'street 12', id: id
            },
            mutation: userMutation,
        })).data;
        expect(success.updateUser).toBeTruthy();
        let message = '';
        try {
            yield apolloclient.mutate({
                variables: {
                    firstname: 'first', lastname: 'last',
                    birthdate: '11.11.2011', email: 'test.test.@test.com', address: 'street 12', id: id
                },
                mutation: userMutation,
            });
        }
        catch (error) {
            const test = error;
            message = test.message;
        }
        expect(message).toContain('Unauthorized action');
    }));
    test('User was removed', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ username: 'usernameTest' });
        const id = user === null || user === void 0 ? void 0 : user.id;
        const userMutation = apollo_server_express_1.gql `

			mutation Remove($id: String!){
				remove(id:$id) 
    		}
		  `;
        let message = '';
        try {
            yield apolloclient.mutate({
                variables: { id: id },
                mutation: userMutation,
            });
        }
        catch (error) {
            const test = error;
            message = test.message;
        }
        expect(message).toContain('Unauthorized action');
        const success = (yield clientWithHeaders.mutate({
            variables: { id: id },
            mutation: userMutation,
        })).data;
        expect(success).toBeTruthy();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
        // admin testuser
        const testuser = {
            username: 'admin',
            password: userFunctions_1.hashPassword('admin'),
            firstname: 'admin',
            lastname: 'admin'
        };
        const userTest = new user_1.default(testuser);
        console.log(yield userTest.save());
        void mongoose_1.default.connection.close();
        console.log('Database connection closed');
    }));
});
