
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-server';
import 'cross-fetch/polyfill';
import { query } from '../types';

const apolloclient = new ApolloClient(
	{
	
	uri: 'http://localhost:4000/',
	
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

		const object= (await apolloclient.query({
			query: userQuery
		})).data as query;

		
		expect(object.search.tracks.length > 0).toBe(true);
	});
	
	
})