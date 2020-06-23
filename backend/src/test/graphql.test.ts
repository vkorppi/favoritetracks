
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-server-express';
import 'cross-fetch/polyfill';
import { query } from '../types';
import mongoose from 'mongoose';
import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';

const apolloclient = new ApolloClient(
	{

		uri: 'http://localhost:4000/graphql',

		onError: (error) => {
			console.log(error);
		}

	}
);


describe('Testing graphql queries', () => {



	test('Returns names of tracks', async () => {

		const userQuery = gql`

		query {
			search(track: "nagasaki",page: 1) 
			{
      			tracks
      			total
    		}
		  }`;

		const object = (await apolloclient.query({
			query: userQuery
		})).data as query;


		expect(object.search.tracks.length > 0).toBe(true);
	});

	afterAll(async () => {
		await User.deleteMany({});
		void mongoose.connection.close();
		console.log('Database connection closed');
	});

});


describe('Testing graphql queries', () => {

	const parser = typeparsers.parseString;

	beforeAll(async () => {

		const env = process.env;
		const error = 'databser url was not as string';

		const configuration = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		};

		await mongoose.connect(parser(env.DBTEST, error), configuration);

	});



	afterAll(async () => {
		await User.deleteMany({});
		void mongoose.connection.close();
		console.log('Database connection closed');
	});
	
});