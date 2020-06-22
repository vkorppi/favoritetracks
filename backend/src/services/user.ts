

import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import { UserInputType, UserSchemaType, TokenType } from '../types';
import { hashPassword } from '../utils/userFunctions';
import  {sign}  from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

export const create = async (username: string, password: string, firstname: string, lastname: string): Promise<void> => {

    const usernameError = 'username: username was not a string';
    const nameError = 'name: name was not a string';

    const parser = typeparsers.parseString;

    const userInput: UserInputType = {
        username: parser(username, usernameError),
        password: hashPassword(password),
        firstname: parser(firstname, nameError),
        lastname: parser(lastname, nameError)
    } as UserInputType;

    const user = new User(userInput);
    await user.save();
};



const updateName = async (firstname: string, lastname: string, id: string): Promise<void> => {

    await User.update({ _id: id },
        {
            $set:
            {
                "firstname": firstname,
                "lastname": lastname
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


const search = async (firstname?: string, lastname?: string, username?: string): Promise<UserSchemaType | null> => {

    firstname = !firstname ? '' : firstname;
    lastname  = !lastname  ? '' : lastname;
    username  = !username  ? '' : username;

    return await User.findOne({ $or: [{ firstname: firstname }, { lastname: lastname }, { username: username }] });
};


const login = async (username:string,password:string): Promise<TokenType>  => {

    const usernameError="username was invalid";
    const passwordError="password was invalid";
    const secretError='was not a string';

    const parser = typeparsers.parseString;
    const env = process.env;

    const parsedUsername=parser(username,usernameError);
    const parsedPassword=parser(password,passwordError);

    const id =await check(parsedUsername,parsedPassword);

    return { value: sign({username: username,id: id}, parser(env.SECRET,secretError)) };
};

const check = async (username:string,password:string): Promise<string>  => {

    const user = await search('','',username);

    if(!user) {
        throw new UserInputError('Username did match any users');
    }
    else {

        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect) {
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