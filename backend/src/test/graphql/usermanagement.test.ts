

import typeparsers from '../../utils/typeparsers';
import mongoose from 'mongoose';
import User from '../../mongo/user';
import { UserSchemaType, UserType } from '../../types/userTypes';
import { hashPassword } from '../../utils/userFunctions';
import { gql } from 'apollo-server-express';
import ApolloClient from 'apollo-boost';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';

dotenv.config();

const apolloclient = new ApolloClient(
	{

		uri: 'http://localhost:4000/graphql',
        fetch,
		onError: (error) => {
			console.log(error);
		}

	}
);

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

		//await User.deleteMany({});
		await User.deleteMany( {  "username" : { $ne : "adminUser" } } );

		const testuser: UserSchemaType = {
			username: 'usernameTest',
			password: hashPassword('passwordTest'),
			firstname: 'firstnameTest',
			lastname: 'lastnameTest'
		} as UserSchemaType;

		const userTest = new User(testuser);
		await userTest.save();

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

		expect(success.updatePassword).toBeTruthy();


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

	// Voi palauttaa tyhjän talukon

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
		//await User.deleteMany({});
		await User.deleteMany( {  "username" : { $ne : "adminUser" } } );
		void mongoose.connection.close();
		console.log('Database connection closed');
	});

});
