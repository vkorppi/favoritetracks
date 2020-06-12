

import spotify from '../services/spotify';
import {errorResponse } from '../types';

export const resolvers = {

    Query: {
		
        tracks:async (root: any, args: { track: string; page: number; }):Promise<string[] | errorResponse> => {
        
       
          return  await spotify.search(args.track,args.page).then(result => {
                return result.tracks.items.map(value => value.name);  
            });
     

    }

}
};

