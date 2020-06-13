

import spotify from '../services/spotify';
import { ApolloError, UserInputError } from 'apollo-server';

import { searchResult } from '../types';

export const resolvers = {

    Query: {
		
        search:async (_root: any, args: { track: string; page: number; }):Promise<searchResult | void> => {
             
          return  await spotify.search(args.track,args.page).then(result => {
              
                const fetchedTracks:string[] = result.tracks.items.map(value => value.name);

                return  { tracks:fetchedTracks, total:result.tracks.total};
   
              
            }).catch((error:Error) => {

                console.error(error.stack);

                if(error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if(error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
              });
            
            
    }

}
};

