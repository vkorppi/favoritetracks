

import user from '../../services/user';
import spotify from '../../services/spotify';
import { ApolloError, UserInputError } from 'apollo-server-express';
import { UserSchemaType } from '../../types/userTypes';
import { spotifyToken,refreshtoken } from '../../types/sessionTypes';

 export const delegateToken = async (_root: unknown, args: { code: string,playlist: string }, userdata: UserSchemaType ): Promise<void | spotifyToken> => {
     
    const code = args.code ;
    const playlist = args.playlist;

    await user.addPLaylist(playlist,userdata.id);
			
    return await spotify.delegateToken(code).then(result => { 
    
        return result;
    
    }).catch((error: Error) => {
        
        console.error(error.stack);
        
        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }
    });
};

export const getUserLoggedin = async (_root: unknown, args: { code: string,playlist: string }, userdata: UserSchemaType ): Promise<UserSchemaType | null> => {

    if(args) null;

    return await user.getUser(userdata.id);
};

export const delegateRefreshedToken = async (_root: unknown, args: { refreshedToken: string;}): Promise<void | refreshtoken> => {

    const refreshedToken = args.refreshedToken ;
            
    return await spotify.delegateRefreshedToken(refreshedToken).then(result => { 
    
        console.log(result);
       
        return result;

    }).catch((error: Error) => {

        console.error(error.stack);

        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }

    });

};

export default {
    delegateRefreshedToken,
    getUserLoggedin,
    delegateToken
};