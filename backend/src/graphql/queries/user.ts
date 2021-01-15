
import { ApolloError, UserInputError,  } from 'apollo-server-express';
import { UserSchemaType } from '../../types/userTypes';
import user from '../../services/user';

export const searchUser = async (_root: unknown, args: { value: string; }): Promise<UserSchemaType[] | void> => {

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

export const getUser = async (_root: unknown, args: { id: string; }): Promise<void | UserSchemaType | null> => {

    const id: string = args.id;

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
    getUser
};