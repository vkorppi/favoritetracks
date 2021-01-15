import spotify from '../../services/spotify';
import { ApolloError, UserInputError,  } from 'apollo-server-express';
import { UserSchemaType } from '../../types/userTypes';



export const addTrackToList = async (_root: unknown, args: { tracks: string[] }, userdata: UserSchemaType): Promise<string> => {

    const tracks: string[] = args.tracks;


    await spotify.AddToList(tracks, userdata.id).catch((error: Error) => {

        console.error(error.stack);

        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }

    });

    return `Tracks: ${tracks.toString()} was added succesfully`;

};

export const removeItem = async (_root: unknown, args: { tracks: string[] }, userdata: UserSchemaType): Promise<string> => {

    const tracks: string[] = args.tracks;

    
    await spotify.removeItem(userdata.id,tracks).catch((error: Error) => {

        console.error(error.stack);

        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }

    });

    return `Tracks: ${tracks.toString()} was removed succesfully`;

};

export default {
    addTrackToList,
    removeItem
};