
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-server-express';
import 'cross-fetch/polyfill';
import { query, UserInputType,UserType } from '../types';
import mongoose from 'mongoose';
import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';

import dotenv from 'dotenv';

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
			password: 'passwordTest',
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
				create(username: "username",password: "password",firstname:"first",lastname:"last") 
    		}
		  `;

		const success = (await apolloclient.mutate({
			mutation: userMutation
		})).data as createType;

		expect(success.create).toBe(true);

	});

	test('User was updated', async () => {

		/*

		await User.deleteMany({});

		const testuser: UserInputType = {
			username: 'usernameTest',
			password: 'passwordTest',
			firstname: 'firstnameTest',
			lastname: 'lastnameTest'
		} as UserInputType;

		const userTest = new User(testuser);
		await userTest.save();

		*/


		interface updateType {
			updateName: boolean;
		}

		const user = await User.findOne({ username: 'usernameTest' });
		const id = user?.id as string;

		const userMutation = gql`

			mutation UpdateName($firstname: String!,$lastname: String!,$id: String!){
				updateName(firstname:$firstname,lastname:$lastname,id:$id) 
    		}
		  `;


		const success = (await apolloclient.mutate({
			variables: { id: id, firstname: 'first', lastname: 'last' },
			mutation: userMutation,
		})).data as updateType;


		expect(success.updateName).toBe(true);


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

		/*
		await User.deleteMany({});

		const testuser: UserInputType = {
			username: 'usernameTest',
			password: 'passwordTest',
			firstname: 'firstnameTest',
			lastname: 'lastnameTest'
		} as UserInputType;

		const user = new User(testuser);
		return await user.save();
		*/


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

		/*
		
		await User.deleteMany({});

		const testuser: UserInputType = {
			username: 'usernameTest',
			password: 'passwordTest',
			firstname: 'firstnameTest',
			lastname: 'lastnameTest'
		} as UserInputType;

		const user = new User(testuser);
		return await user.save();

		*/

		const userQuery = gql`

		query {
			searchUser(username: "usernameTest",firstname: "firstnameTest",lastname: "lastnameTest") 
			{
				firstname
				lastname
				username
    		}
		  }`;

		const fetcheduser = (await apolloclient.query({
			query: userQuery
		})).data as UserType;


		expect(fetcheduser.username).toBe('usernameTest');



	});


	afterAll(async () => {
		await User.deleteMany({});
		void mongoose.connection.close();
		console.log('Database connection closed');
	});

});