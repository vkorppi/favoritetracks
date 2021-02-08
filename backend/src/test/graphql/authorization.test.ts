
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-server-express';
import 'cross-fetch/polyfill';
import { UserSchemaType, UserType } from '../../types/userTypes';
import mongoose from 'mongoose';
import typeparsers from '../../utils/typeparsers';
import User from '../../mongo/user';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';
import { hashPassword } from '../../utils/userFunctions';
import { getSessionEnvs } from '../../utils/envFunctions';
import { sign } from 'jsonwebtoken';

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

describe('Testing  mutations and queries that require authorization header', () => {

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

		//await User.deleteMany({});
		await User.deleteMany( {  "username" : { $ne : "adminUser" } } );

		const testuser: UserSchemaType = {
			username: 'usernameTest',
			password: hashPassword('passwordTest'),
			firstname: 'firstnameTest',
			lastname: 'lastnameTest',
			admin: true
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

		const success = await clientWithHeaders.mutate({
			variables: {
				tracks:
					[
						'spotify:track:59LSFQW38CnzJylvtYJKJu',
						'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
					], userId: id
			},
			mutation: usermutation
		});

		interface dataType2 {
			addTrackToList: boolean;
		}

		interface dataType {
			data: dataType2;
		}

		const content = success as dataType;

		expect(content.data.addTrackToList).toBeTruthy();
	});

	test("Query returns user's favorites", async () => {

		const favoritesQuery = gql`

		query {
			getList {
				name,
				uri
			}
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

		const items = fetcheduser.data.getList;

		expect(items.length).toBe(2);

	});

	test("Mutation removes tracks", async () => {

		const RemoveTracksmutation = gql`

		mutation removeItem($tracks: [String!]!){
			removeItem(tracks: $tracks) 
				
		  }`;

	const success = await clientWithHeaders.mutate({
			variables: {
				tracks:
					[
						'spotify:track:59LSFQW38CnzJylvtYJKJu',
						'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
					]
			},
			mutation: RemoveTracksmutation
		});

		interface dataType2 {
			removeItem: boolean;
		}

		interface dataType {
			data: dataType2;
		}

		const content = success as dataType;

		expect(content.data.removeItem).toBeTruthy();

	});

	test("Query returns userojbect", async () => {


		const loggedinUser = gql`

		query {
			getUserLoggedin {
				
					firstname,
					lastname,
					username,
					id
				
			}
		}`;

		interface dataType2 {
			getUserLoggedin: UserType;
		}

		interface dataType {
			data: dataType2;
		}


		const fetcheduser = (await clientWithHeaders.query({
			query: loggedinUser,
		})) as dataType;

		const user = fetcheduser.data.getUserLoggedin;

		expect(user).toBeTruthy();
	
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

		const success = (await clientWithHeaders.mutate({
			mutation: userMutation
		})).data as createType;

		expect(success.create).toBeTruthy();

		let message = '';

		try {

		await apolloclient.mutate({
			mutation: userMutation,
		});
		}
		catch(error) {
			const test: Error = error as Error;
			message = test.message;
		}

		expect(message).toContain('Unauthorized action');

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

		const success = (await clientWithHeaders.mutate({
			variables: {
				firstname: 'first', lastname: 'last',
				birthdate: '11.11.2011', email: 'test.test.@test.com', address: 'street 12', id: id
			},
			mutation: userMutation,
		})).data as updateType;


		expect(success.updateUser).toBeTruthy();

		let message = '';

		try {

		await apolloclient.mutate({
			variables: {
				firstname: 'first', lastname: 'last',
				birthdate: '11.11.2011', email: 'test.test.@test.com', address: 'street 12', id: id
			},
			mutation: userMutation,
		});
		}
		catch(error) {
			const test: Error = error as Error;
			message = test.message;
		}

		expect(message).toContain('Unauthorized action');


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


		let message = '';

		try {

		await apolloclient.mutate({
			variables: { id: id },
			mutation: userMutation,
		});
		}
		catch(error) {
			const test: Error = error as Error;
			message = test.message;
		}

		expect(message).toContain('Unauthorized action');


		const success = (await clientWithHeaders.mutate({
			variables: { id: id },
			mutation: userMutation,
		})).data as updateType;

		expect(success).toBeTruthy();

	});


	afterAll(async () => {
		
		//await User.deleteMany({});
		await User.deleteMany( {  "username" : { $ne : "adminUser" } } );

		// admin testuser
		const testuser: UserSchemaType = {
			username: 'admin',
			password: hashPassword('admin'),
			firstname: 'admin',
			lastname: 'admin',
			birthdate: '11.11.1999',
			email: 'test.test@mail.com',
			address: 'road 12',
			admin: true
		} as UserSchemaType;

		const userTest = new User(testuser);
		console.log(await userTest.save());


		void mongoose.connection.close();
		console.log('Database connection closed');
	});

});