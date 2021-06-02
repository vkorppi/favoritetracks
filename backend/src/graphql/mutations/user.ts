import { ApolloError, UserInputError, ForbiddenError } from 'apollo-server-express';
import user from '../../services/user';
import { MongoError } from 'mongodb';
import { requestType } from '../../types/sessionTypes';
import { session } from './Systemsession';

export const create =  async (_root: unknown, args: {
    username: string, password: string, firstname: string,
    lastname: string, birthdate: string, email: string, address: string
}, { req }: requestType): Promise<string | void> => {

    const loggedUser= await user.session.hasSession(req.session.sessionid);

    if(!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }
   
    if( !user.isAdmin(loggedUser)) {
        throw new ForbiddenError("Unauthorized action");
    }

    const firstname: string = args.firstname;
    const lastname: string = args.lastname;
    const username: string = args.username;
    const password: string = args.password;
    const email: string = args.email;
    const address: string = args.address;
    const birthdate: string = args.birthdate;


    return await user.create(username, password, firstname, lastname, birthdate, email, address).then(() => {
        return `User was created with following data: username: ${username}, firstname: ${firstname}, lastname:  ${lastname} `+
        `birthdate: ${birthdate} email: ${email} address: ${address}`;

    }).catch((error: Error) => {

        console.error(error.stack);

        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }
        else if (error instanceof MongoError) {
            throw new UserInputError(error.message);
        }


    });
};

export const updateUser = async (_root: unknown, args: { firstname: string, lastname: string, birthdate: string, email: string, address: string, id: string }
    , { req }: requestType): Promise<string | void> => {

    const firstname: string = args.firstname;
    const lastname: string = args.lastname;
    const id: string = args.id;
    const birthdate: string = args.birthdate;
    const email: string = args.email;
    const address: string = args.address;

    const loggedUser= await user.session.hasSession(req.session.sessionid);

    if(!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }

    if(!user.isAdmin(loggedUser) && id !== loggedUser.id) {
        throw new ForbiddenError("Unauthorized action");
    }

    return await user.update(firstname, lastname, birthdate, email, address, id).then(() => {
        return `User was updated with following data: firstname: ${firstname}, lastname:  ${lastname} `+
        `birthdate: ${birthdate} email: ${email} address: ${address}`;

    }).catch((error: Error) => {

        console.error(error.stack);


        if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }
        else if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof MongoError) {
            throw new UserInputError(error.message);
        }


    });
};

/*
export const updatePassword = async (_root: unknown, args: { password: string, id: string }, { req }: requestType): Promise<string | void> => {

    const password: string = args.password;
    const id: string = args.id;

    return await user.updatePassword(password, id).then(() => {

        return `User's password was updated. User's id was ${id}`;

    }).catch((error: Error) => {

        console.error(error.stack);

        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }
        else if (error instanceof MongoError) {
            throw new UserInputError(error.message);
        }


    });
};
*/

export const remove = async (_root: unknown, args: { id: string },{ req }: requestType): Promise<string | void> => {
            

    const loggedUser= await user.session.hasSession(req.session.sessionid);

    if(!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }
   
    if( !user.isAdmin(loggedUser)) {
        throw new ForbiddenError("Unauthorized action");
    }

    const id: string = args.id;

    return await user.remove(id).then(() => {

        return `User with id: ${id} was removed`;

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
    create,
    updateUser,
   // updatePassword,
    remove,
    session
};



