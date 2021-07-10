

import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import { Authorization, UserSchemaType, UserType } from '../types/userTypes';
import { hashPassword } from '../utils/userFunctions';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

const parser = typeparsers.parseString;
const emailParser = typeparsers.parseEmailUserInput;
const dateParser = typeparsers.parseBirthdate;
import { getMessage } from '../utils/errorFunctions';
import { session } from '../services/systemSession';

const firstnameError = getMessage('string', 'firstname', true);
const lastnameError = getMessage('string', 'lastname', true);
const birthdateError = getMessage('format', 'birthdate', true);
const emailError = getMessage('format', 'email', true);
const addressError = getMessage('string', 'address', true);


export const create = async (username: string, password: string, firstname: string, lastname: string, birthdate: string, email: string, address: string): Promise<UserType> => {

    const fetchedUser = await User.findOne({ username: username });

    const usernameError = getMessage('string', 'username', true);



    if (fetchedUser) {
        throw new UserInputError('userInput: username was reserverd ');
    }

    const userInput: UserSchemaType = {

        username: parser(username, usernameError),
        password: hashPassword(password),
        firstname: parser(firstname, firstnameError),
        lastname: parser(lastname, lastnameError),
        birthdate: birthdate ? dateParser(birthdate, birthdateError) : '',
        email: email ? emailParser(email, emailError) : '',
        address: address ? parser(address, addressError) : '',
        admin: false,
        sessionid:''

    } as UserSchemaType;

    const user = new User(userInput);
    return await user.save();
};


const update = async (firstname: string, lastname: string, birthdate: string, email: string, address: string, id: string): Promise<void> => {


    await User.updateOne({ _id: id },
        {
            $set:
            {
                "firstname": parser(firstname, firstnameError),
                "lastname": parser(lastname, lastnameError),
                "birthdate": birthdate ? dateParser(birthdate, birthdateError) : '',
                "email": email ? emailParser(email, emailError) : '',
                "address": address ? parser(address, addressError) : ''
            }
        });

};


export const updatePassword = async (password: string, id: string): Promise<void> => {

    await User.updateOne({ _id: id },
        {
            $set:
            {
                "password": hashPassword(password)
            }
        });
};




const remove = async (id: string): Promise<void> => {

    await User.deleteOne({ _id: id });

};


const search = async (value: string): Promise<UserSchemaType[]> => {


    const searchCriteria = {
        $or: [
            { firstname: { $regex: '.*' + value + '.*' } },
            { lastname: { $regex: '.*' + value + '.*' } },
            { username: { $regex: '.*' + value + '.*' } }
        ]
    };


    const users = await User.find(searchCriteria);

    if (!users) {
        throw new UserInputError('userInput: Search did not return any results');
    }
    return users;

};


const login = async (username: string, password: string): Promise<string> => {


    return await check(
        parser(username, getMessage('string', 'username', true)),
        parser(password, "userInput: password was invalid")
    );

};



const check = async (username: string, password: string): Promise<string> => {

    const user = await User.findOne({ username: username });

    if (!user) {
        throw new UserInputError('userInput: Username did match any users');
    }
    else {

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new UserInputError('userInput: Password was incorrect');
        }
    }
    return user.id as string;
};


const getUser = async (id: string): Promise<UserSchemaType | null> => {

    return await User.findOne({ _id: id });
};

const getUserLoggedin = async (sessionid: string): Promise<UserSchemaType | null> => {

    return await User.findOne({ sessionid: sessionid });
};

const addPLaylist = async (playlist: string, sessionid: string): Promise<string> => {

    await User.updateOne({ sessionid: sessionid },
        {
            $set:
            {
                "playlist": parser(
                    playlist,
                    getMessage('string', 'playlist', false))
            }
        });

    return "playlist added";

};

export const isAdmin = (user: UserSchemaType): boolean => {

    if (!user.admin) {
        return false;
    }

    return true;

};

export const getAuthorization =async (sessionid: string):  Promise<Authorization> => {

    const fetchedUser = await User.findOne({ sessionid: sessionid });

    const islogged = !(!fetchedUser);
    let isadmin = false;

    if(islogged) {
        isadmin = isAdmin(fetchedUser as UserSchemaType);
    }

    return { "authenticated": islogged, "admin": isadmin };

};



export default {
    create,
    updatePassword,
    update,
    remove,
    search,
    check,
    login,
    getUser,
    addPLaylist,
    isAdmin,
    session,
    getAuthorization,
    getUserLoggedin
};