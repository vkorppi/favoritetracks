
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-server-express';
import 'cross-fetch/polyfill';
import { query, UserSchemaType, UserType } from '../types';
import mongoose from 'mongoose';
import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';

import dotenv from 'dotenv';
import { hashPassword } from '../utils/userFunctions';
import { getSessionEnvs } from '../utils/envFunctions';
import { sign } from 'jsonwebtoken';


dotenv.config();

const apolloclient = new ApolloClient(
	{

		uri: 'http://localhost:4000/graphql',

		onError: (error) => {
			console.log(error);
		}

	}
);


describe('Testing spotify', () => {



	test('Returns names of tracks', async () => {

		const spotifyQuery = gql`

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

		const object = (await apolloclient.query({
			query: spotifyQuery
		})).data as query;

		console.log(object.search.tracks);

		expect(object.search.tracks.length > 0).toBe(true);
	});

});


describe('Testing usermanagement', () => {

	const parser = typeparsers.parseString;

	beforeAll(async () => {

		const env = process.env;


		const error = 'databseurl url was not as string';

		const configuration = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		};

		await mongoose.connect(parser(env.DBTEST, error), configuration);

	});


	beforeEach(async () => {

		await User.deleteMany({});

		const testuser: UserSchemaType = {
			username: 'usernameTest',
			password: hashPassword('passwordTest'),
			firstname: 'firstnameTest',
			lastname: 'lastnameTest'
		} as UserSchemaType;

		const userTest = new User(testuser);
		await userTest.save();

	});

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

		expect(success.create).toBe(true);

	});

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


		expect(success.updateUser).toBe(true);


	});

	test('Password was updated', async () => {

		interface updateType {
			updatePassword: boolean;
		}

		const user = await User.findOne({ username: 'usernameTest' });
		const id = user?.id as string;

		const userMutation = gql`

			mutation UpdatePassword($password: String!,$id: String!){
				updatePassword(password:$password,id:$id) 
    		}
		  `;


		const success = (await apolloclient.mutate({
			variables: { password: 'newpassword', id: id },
			mutation: userMutation,
		})).data as updateType;

		expect(success.updatePassword).toBe(true);


	});

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

		expect(success.remove).toBe(true);
	});

	test('Login works', async () => {

		interface updateType {
			login: boolean;
		}

		const username = 'usernameTest';
		const password = 'passwordTest';

		const userMutation = gql`

			mutation Login($username: String!,$password: String!){
				login(username:$username,password:$password) 
				{
					value
				}
    		}
		  `;


		const token = (await apolloclient.mutate({
			variables: { username: username, password: password },
			mutation: userMutation,
		})).data as updateType;

		expect(token.login).toBeTruthy();


	});

	test('User search works', async () => {

		interface userSearchType {
			searchUser: UserType;
		}

		const userQuery = gql`

		query {
			searchUser(value: "usernameTest") 
			{
				firstname,
				lastname,
				username,
				id
			  }
		  }`;

		const fetcheduser = (await apolloclient.query({
			query: userQuery
		})).data as userSearchType;


		expect(fetcheduser.searchUser).toBeTruthy();



	});

	test('User can be fetched with id', async () => {

		interface userGetuserType {
			getUser: UserType;
		}

		const user = await User.findOne({ username: 'usernameTest' });
		const id = user?.id as string;

		const userQuery = gql`

		query getUser($id: String!){
			getUser(id: $id) 
				{
					firstname,
					lastname,
					username,
					id
				}
		  }`;


		const fetcheduser = (await apolloclient.query({
			variables: { id: id },
			query: userQuery
		})).data as userGetuserType;

		expect(fetcheduser).toBeTruthy();


	});


	afterAll(async () => {
		await User.deleteMany({});
		void mongoose.connection.close();
		console.log('Database connection closed');
	});

});


describe('Testing spotify mutations and queries that require authorization header', () => {

	const parser = typeparsers.parseString;
	let clientWithHeaders: ApolloClient<unknown>;

	beforeAll(async () => {

		const { secret } = getSessionEnvs();



		const env = process.env;

		const error = 'databseurl url was not as string';

		const configuration = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		};

		await mongoose.connect(parser(env.DBTEST, error), configuration);

		await User.deleteMany({});

		const testuser: UserSchemaType = {
			username: 'usernameTest',
			password: hashPassword('passwordTest'),
			firstname: 'firstnameTest',
			lastname: 'lastnameTest'
		} as UserSchemaType;



		const userTest = new User(testuser);
		await userTest.save();

		const token = sign({ username: userTest.username, id: userTest.id as string }, secret);
		

		clientWithHeaders = new ApolloClient({

			uri: 'http://localhost:4000/graphql',

			
			request: config => {
				config.setContext({ headers: { authorization: `bearer ${token}`, }, });
			},
			

		});

	});

	test('New tracks should be added without any failures', async () => {

		
		const usermutation = gql`

		mutation AddTrackToList($tracks: [String!]!){
			addTrackToList(tracks: $tracks) 
				
		  }`;

		const user = await User.findOne({ username: 'usernameTest' });
		const id = user?.id as string;

		const success=await clientWithHeaders.mutate({
			variables: { tracks: 
				[ 
					'spotify:track:59LSFQW38CnzJylvtYJKJu',
					'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
				], userId: id },
			mutation: usermutation
		});

		interface dataType2 {
			addTrackToList: boolean;
		}

		interface dataType {
			data: dataType2;
		}

		const content = success as dataType;
		
		expect(content.data.addTrackToList).toBe(true);
	});

	test("Query returns user's favorites", async () => {

		const favoritesQuery = gql`

		query {
			getList
		}`;

		interface dataType2 {
			getList: string[];
		}

		interface dataType {
			data: dataType2;
		}
		

		const fetcheduser = (await clientWithHeaders.query({
			query: favoritesQuery
		})) as dataType;

		const items =fetcheduser.data.getList;

		expect(items.length).toBe(2);

	});

	afterAll(async () => {
		await User.deleteMany({});
		void mongoose.connection.close();
		console.log('Database connection closed');
	});

});