
import { ApolloError, UserInputError, ForbiddenError } from 'apollo-server-express';
import { UserSchemaType } from '../../types/userTypes';
import user from '../../services/user';
import { requestType } from '../../types/sessionTypes';
import {session} from './spotifySession';



export const searchUser = async (_root: unknown, args: { value: string; }, { req }: requestType): Promise<UserSchemaType[] | void> => {

    const loggedUser = await user.session.hasSession(req.session.sessionid);

    if (!loggedUser) {
        //throw new ForbiddenError("Unauthorized action");
        throw new ForbiddenError("no user");
    }

    if (!user.isAdmin(loggedUser)) {
        //  throw new ForbiddenError("Unauthorized action");

        throw new ForbiddenError("no admin " + req.session.sessionid);
    }

    const value: string = args.value;


    return await user.search(value).then(result => {

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

export const getUser = async (_root: unknown, args: { id: string; }, { req }: requestType): Promise<void | UserSchemaType | null> => {

    const id: string = args.id;

    const loggedUser = await user.getUser(req.session.sessionid) as UserSchemaType;

    if (!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }

    if (!user.isAdmin(loggedUser) && id !== loggedUser.id) {
        throw new ForbiddenError("Unauthorized action");
    }

    return await user.getUser(id).then(result => {

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
    searchUser,
    getUser,
    session
};