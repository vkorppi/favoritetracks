

import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import { UserInputType, TokenType, UserType, UserSchemaType } from '../types';
import { hashPassword } from '../utils/userFunctions';
import { sign } from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

const parser = typeparsers.parseString;
const emailParser = typeparsers.parseEmailUserInput;
const dateParser = typeparsers.parseBirthdate;
const env = process.env;
import { getMessage } from '../utils/errorFunctions';
import { getSessionEnvs } from '../utils/envFunctions';


export const create = async (username: string, password: string, firstname: string, lastname: string, birthdate: string, email: string, address: string): Promise<UserType> => {

    const fetchedUser = await User.findOne({ username: username });

    if (fetchedUser) {
        throw new UserInputError('userInput: username was reserverd ');
    }

    const userInput: UserInputType = {
        username: parser(
            username,
            getMessage('string', 'username', true)
        ),
        password: hashPassword(password),
        firstname: parser(
            firstname,
            getMessage('string', 'firstname', true)
        ),
        lastname: parser(
            lastname,
            getMessage('string', 'lastname', true)),
        birthdate: birthdate ? dateParser(
            birthdate,
            getMessage('format', 'birthdate', true)) : '',
        email: email ? emailParser(
            email,
            getMessage('format', 'email', true)) : '',
        address: address ? parser(
            address,
            getMessage('string', 'address', true)) : ''

    } as UserInputType;

    const user = new User(userInput);
    return await user.save();
};

const addList = async (favorites: string, id: string): Promise<void> => {

    await User.updateOne({ _id: id },
        {
            $set:
            {
                "favorites": parser(
                    favorites,
                    getMessage('string', 'favorites', true))
            }
        });

};


const update = async (firstname: string, lastname: string, birthdate: string, email: string, address: string, id: string): Promise<void> => {

    await User.updateOne({ _id: id },
        {
            $set:
            {
                "firstname": parser(
                    firstname,
                    getMessage('string', 'firstname', true)),
                "lastname": parser(
                    lastname,
                    getMessage('string', 'lastname', true)),
                "birthdate": birthdate ? dateParser(
                    birthdate
                    , getMessage('format', 'birthdate', true)) : '',
                "email": email ? emailParser(
                    email,
                    getMessage('format', 'email', true)) : '',
                "address": address ? parser(
                    address,
                    getMessage('string', 'address', true)) : ''
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


export default {
    create,
    updatePassword,
    update,
    remove,
    search,
    check,
    login,
    getUser,
    addList
};