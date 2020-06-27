

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


export const create = async (username: string, password: string, firstname: string, lastname: string, birthdate: string, email: string, address: string): Promise<UserType> => {

    const fetchedUser = await User.findOne({ username: username });

    if (fetchedUser) {
        throw new UserInputError('Username: username was reserverd ');
    }


    const userInput: UserInputType = {
        username: parser(
            username,
            getMessage('string', 'username')
        ),
        password: hashPassword(password),
        firstname: parser(
            firstname,
            getMessage('string', 'firstname')
        ),
        lastname: parser(
            lastname,
            getMessage('string', 'lastname')),
        birthdate: birthdate ? dateParser(
            birthdate,
            getMessage('format', 'lastname')) : '',
        email: email ? emailParser(
            email,
            getMessage('format', 'email')) : '',
        address: address ? parser(
            address,
            getMessage('string', 'address')) : ''
    } as UserInputType;

    const user = new User(userInput);
    return await user.save();
};



const updateName = async (firstname: string, lastname: string, birthdate: string, email: string, address: string, id: string): Promise<void> => {

    await User.updateOne({ _id: id },
        {
            $set:
            {
                "firstname": parser(
                    firstname,
                    getMessage('string', 'firstname')),
                "lastname": parser(
                    lastname,
                    getMessage('string', 'lastname')),
                "birthdate": birthdate ? dateParser(
                    birthdate
                    , getMessage('format', 'birthdate')) : '',
                "email": email ? emailParser(
                    email,
                    getMessage('format', 'email')) : '',
                "address": address ? parser(
                    address,
                    getMessage('string', 'address')) : ''
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
        throw new UserInputError('Search: Search did not return any results');
    }
    return users;

};


const login = async (username: string, password: string): Promise<TokenType> => {

    const id = await check(
        parser(username, getMessage('string', 'username')),
        parser(password, "password was invalid")
    );

    return { value: sign({ username: username, id: id }, parser(env.SECRET, getMessage('EnvString', 'SECRET'))) };
};

const check = async (username: string, password: string): Promise<string> => {

    const user = await User.findOne({ username: username });

    if (!user) {
        throw new UserInputError('Username: Username did match any users');
    }
    else {

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new UserInputError('Password: Password was incorrect');
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
    updateName,
    remove,
    search,
    check,
    login,
    getUser
};