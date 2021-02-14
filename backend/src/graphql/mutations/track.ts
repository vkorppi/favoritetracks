import spotify from '../../services/spotify';
import { ApolloError, UserInputError,  } from 'apollo-server-express';
import { UserSchemaType } from '../../types/userTypes';
import { trackObject } from '../../types/favoritesTypes';



export const addTrackToList = async (_root: unknown, args: { tracks: trackObject[] }, userdata: UserSchemaType): Promise<string> => {

    const tracks: trackObject[] = args.tracks;


    await spotify.AddToList(tracks, userdata.id).catch((error: Error) => {

        console.error(error.stack);

        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }

    });

    return `Tracks were added succesfully`;

};

export const removeItem = async (_root: unknown, args: { track: trackObject }, userdata: UserSchemaType): Promise<string> => {

    const track: trackObject = args.track;

    
    await spotify.removeItem(userdata.id,track).catch((error: Error) => {

        console.error(error.stack);

        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }

    });

    return `Track was removed succesfully`;

};

export default {
    addTrackToList,
    removeItem
};