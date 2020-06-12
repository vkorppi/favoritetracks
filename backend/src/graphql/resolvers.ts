

import spotify from '../services/spotify';
import { ApolloError } from 'apollo-server';

export const resolvers = {

    Query: {
		
        tracks:async (_root: any, args: { track: string; page: number; }):Promise<string[] | void> => {
             
          return  await spotify.search(args.track,args.page).then(result => {
                return result.tracks.items.map(value => value.name);  
            }).catch((error:Error) => {
                console.error(error.stack);
                throw new ApolloError('Spotify');
              });
            
            
    }

}
};

