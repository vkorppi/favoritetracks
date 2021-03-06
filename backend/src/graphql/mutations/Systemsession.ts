import { ApolloError, UserInputError } from 'apollo-server-express';
import user from '../../services/user';
import { requestType, TokenType } from '../../types/sessionTypes';
import { Authorization } from '../../types/userTypes';


interface loginResponse {
    status: string
}

interface logoutResponse {
    status: string
}



export const login = async (_root: unknown, args: { username: string, password: string }, { req }: requestType): Promise<Authorization | void> => {

    const username: string = args.username;
    const password: string = args.password;

    return await user.login(username, password).then(async id => {


        const sessionid = await user.session.startSession(id);

        req.session.sessionid = sessionid;

        return await user.getAuthorization(sessionid);

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


export const logout = async (_root: unknown, args: unknown, { req }: requestType): Promise<logoutResponse> => {

    const sessionid = req.session.sessionid;

    req.session.cookie.expires = new Date(Date.now() - 3600000);


    req.session.destroy((sessionid) => {
        console.log(sessionid);
    });
    
    await user.session.endSession(sessionid);

    return { "status": "true" };


};



export const session = {
    "login": login,
    "logout": logout
};

export default {
    session
};