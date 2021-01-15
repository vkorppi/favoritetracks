import { ApolloError, UserInputError } from 'apollo-server-express';
import { TokenType } from '../../types/sessionTypes';
import user from '../../services/user';

export const login =async (_root: unknown, args: { username: string, password: string }): Promise<TokenType | void> => {

    const username: string = args.username;
    const password: string = args.password;

    return await user.login(username, password).then(result => {

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
    login
};