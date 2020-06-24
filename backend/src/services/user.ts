

import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import { UserInputType, TokenType, UserType } from '../types';
import { hashPassword } from '../utils/userFunctions';
import { sign } from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

const nameError = 'name: name was not a string';
const usernameError = 'username: username was not a string';
const parser = typeparsers.parseString;
const env = process.env;

export const create = async (username: string, password: string, firstname: string, lastname: string): Promise<UserType> => {

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

    await User.update({ _id: id },
        {
            $set:
            {
                "firstname": parser(firstname, nameError),
                "lastname": parser(lastname, nameError)
            }
        });

};


export const updatePassword = async (password: string, id: string): Promise<void> => {

    await User.update({ _id: id },
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


const search = async (value: string): Promise<UserType> => {


    const searchCriteria = {
        $or: [
            { firstname: value },
            { lastname: value },
            { username: value }
        ]
    };

    const user = await User.findOne(searchCriteria);

    if(!user) {
        throw new UserInputError('Search did not return any results'); 
    }
    
    return {
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname
    };
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
        throw new UserInputError('Username did match any users');
    }
    else {

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new UserInputError('Password was incorrect');
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