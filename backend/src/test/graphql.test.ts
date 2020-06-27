
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-server-express';
import 'cross-fetch/polyfill';
import { query, UserInputType, UserType } from '../types';
import mongoose from 'mongoose';
import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';

import dotenv from 'dotenv';
import { hashPassword } from '../utils/userFunctions';

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
      			tracks
      			total
    		}
		  }`;

		const object = (await apolloclient.query({
			query: spotifyQuery
		})).data as query;


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

		const testuser: UserInputType = {
			username: 'usernameTest',
			password: hashPassword('passwordTest'),
			firstname: 'firstnameTest',
			lastname: 'lastnameTest'
		} as UserInputType;

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
			variables: {  firstname: 'first', lastname: 'last', 
			birthdate: '11.11.2011', email: 'test.test.@test.com',address: 'street 12',id: id },
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
    		}
		  `;


		const success = (await apolloclient.mutate({
			variables: { username: username, password: password },
			mutation: userMutation,
		})).data as updateType;

		expect(success.login).toBe(true);


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