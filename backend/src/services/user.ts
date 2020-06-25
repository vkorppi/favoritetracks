

import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import { UserInputType, TokenType, UserType, UserSchemaType } from '../types';
import { hashPassword } from '../utils/userFunctions';
import { sign } from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

const nameError = 'name: name was not a string';
const usernameError = 'username: username was not a string';
const parser = typeparsers.parseString;
const env = process.env;

export const create = async (username: string, password: string, firstname: string, lastname: string): Promise<UserType> => {

    const fetchedUser = await User.findOne({ username: username });

    if (fetchedUser) {
        throw new UserInputError('Username: username was reserverd ');
    }


    const userInput: UserInputType = {
        username: parser(username, usernameError),
        password: hashPassword(password),
        firstname: parser(firstname, nameError),
        lastname: parser(lastname, nameError)
    } as UserInputType;

    const user = new User(userInput);
    return await user.save();
};



const updateName = async (firstname: string, lastname: string, id: string): Promise<void> => {

    await User.updateOne({ _id: id },
        {
            $set:
            {
                "firstname": parser(firstname, nameError),
                "lastname": parser(lastname, nameError)
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

    const passwordError = "password was invalid";
    const secretError = 'was not a string';

    const id = await check(
        parser(username, usernameError),
        parser(password, passwordError)
    );

    return { value: sign({ username: username, id: id }, parser(env.SECRET, secretError)) };
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


export default {
    create,
    updatePassword,
    updateName,
    remove,
    search,
    check,
    login
};