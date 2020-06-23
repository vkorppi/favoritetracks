
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-server-express';
import 'cross-fetch/polyfill';
import { query } from '../types';
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


describe('Testing users', () => {

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



	afterAll(async () => {
		await User.deleteMany({});
		void mongoose.connection.close();
		console.log('Database connection closed');
	});

});