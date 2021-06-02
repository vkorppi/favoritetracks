

import user from '../../services/user';
import spotify from '../../services/spotify';
import { ApolloError, UserInputError, ForbiddenError } from 'apollo-server-express';
import { UserSchemaType } from '../../types/userTypes';
import { spotifyToken, refreshtoken } from '../../types/sessionTypes';
import { requestType } from '../../types/sessionTypes';


interface test999 {
    test: string;

}

// Delegates new spotifytoken for user
const delegateToken = async (_root: unknown, args: { code: string, playlist: string }, { req }: requestType): Promise<void | spotifyToken> => {

    const code = args.code;
    const playlist = args.playlist;

    const loggedUser = await user.getUser(req.session.userid) as UserSchemaType;

    if (!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }

    await user.addPLaylist(playlist, req.session.userid);

    return await spotify.session.user.delegateToken(code).then(result => {

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

const getUserLoggedin = async (_root: unknown, args: { code: string, playlist: string }, { req }: requestType): Promise<UserSchemaType | null> => {

    if (args) null;

    const loggedUser = await user.getUser(req.session.userid) as UserSchemaType;

    if (!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }

    return loggedUser;
};

// Delegates refreshed spotifytoken to user
const delegateRefreshedToken = async (_root: unknown, args: { refreshesToken: string; }, { req }: requestType): Promise<void | refreshtoken> => {


    const loggedUser = await user.getUser(req.session.userid) as UserSchemaType;

    if (!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }

    const refreshedToken = args.refreshesToken;

    return await spotify.session.user.delegateRefreshedToken(refreshedToken).then(result => {

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

export const test789 = (_root: unknown, args: { test: string }): test999 => {

    const test = args.test;

    return { "test": test };
};

export const session = {
    "delegateRefreshedToken": delegateRefreshedToken,
    "delegateToken": delegateToken,
    "getUserLoggedin": getUserLoggedin
};

export default {
    test789,
    session
};