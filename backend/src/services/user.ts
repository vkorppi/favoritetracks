

import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import { UserSchemaType, TokenType, UserType } from '../types';
import { hashPassword } from '../utils/userFunctions';
import { sign } from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

const parser = typeparsers.parseString;
const emailParser = typeparsers.parseEmailUserInput;
const dateParser = typeparsers.parseBirthdate;
import { getMessage } from '../utils/errorFunctions';
import { getSessionEnvs } from '../utils/envFunctions';

const firstnameError = getMessage('string', 'firstname', true);
const lastnameError = getMessage('string', 'lastname', true);
const birthdateError = getMessage('format', 'birthdate', true);
const emailError =getMessage('format', 'email', true);
const addressError =getMessage('string', 'address', true);


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
        birthdate: birthdate ? dateParser(birthdate,birthdateError ) : '',
        email: email ? emailParser(email,emailError) : '',
        address: address ? parser(address,addressError ) : ''

    } as UserSchemaType;

    const user = new User(userInput);
    return await user.save();
};

const addList = async (favorites: string, id: string): Promise<string> => {

    await User.updateOne({ _id: id },
        {
            $set:
            {
                "favorites": parser(
                    favorites,
                    getMessage('string', 'favorites', false))
            }
        });

    return id;

};


const update = async (firstname: string, lastname: string, birthdate: string, email: string, address: string, id: string): Promise<void> => {


    await User.updateOne({ _id: id },
        {
            $set:
            {
                "firstname": parser(firstname,firstnameError),
                "lastname": parser(lastname,lastnameError),
                "birthdate": birthdate ? dateParser(birthdate, birthdateError) : '',
                "email": email ? emailParser(email,emailError) : '',
                "address": address ? parser(address,addressError) : ''
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


const login = async (username: string, password: string): Promise<TokenType> => {


    const { secret } = getSessionEnvs();

    const id = await check(
        parser(username, getMessage('string', 'username', true)),
        parser(password, "userInput: password was invalid")
    );

    return { value: sign({ username: username, id: id }, secret) };
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

const addPLaylist = async (playlist: string, id: string): Promise<string> => {

    await User.updateOne({ _id: id },
        {
            $set:
            {
                "playlist": parser(
                    playlist,
                    getMessage('string', 'playlist', false))
            }
        });

    return id;

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
    addList,
    addPLaylist
};