
import { gql } from 'apollo-server-express';
import ApolloClient from 'apollo-boost';
import { query } from '../../types/searchType';
import fetch from 'cross-fetch';

let apolloclient:ApolloClient<unknown> ;

describe('Testing spotify', () => {

		beforeAll( () => {

			apolloclient=new ApolloClient(
				{
			
					uri: 'http://localhost:4000/graphql',
					fetch,
					onError: (error) => {
						console.log(error);
					}
			
				}
			);

	});


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