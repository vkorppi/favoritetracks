import spotify from '../../services/spotify';
import user from '../../services/user';
import { ApolloError, UserInputError, ForbiddenError } from 'apollo-server-express';
import { track } from '../../types/favoritesTypes';
import { requestType } from '../../types/sessionTypes';



export const add = async (_root: unknown, args: { tracks: track[] }, { req }: requestType): Promise<string> => {

    const tracks: track[] = args.tracks;
   
    const loggedUser= await user.session.hasSession(req.session.sessionid);

    if (!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }

    await spotify.add(tracks, loggedUser.id).catch((error: Error) => {

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

export const removeTrack = async (_root: unknown, args: { track: track }, { req }: requestType): Promise<string> => {

    const track: track = args.track;
    const loggedUser= await user.session.hasSession(req.session.sessionid);

    if (!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }

    await spotify.removeTrack(loggedUser.id, track).catch((error: Error) => {

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
    add,
    removeTrack
};