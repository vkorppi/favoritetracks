

import bcrypt from 'bcryptjs';
import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import { UserInputType } from '../types';

export const create =  async (username:string,password:string, firstname: string,lastname: string): Promise<void> => {

    const passwordError ='password: password was not a string';
    const usernameError ='username: username was not a string';
    const nameError ='name: name was not a string';

    const parse = typeparsers.parseString;
    const hashedVal =  bcrypt.hashSync(parse(password,passwordError),10);

   const userInput:UserInputType = {
		username: parse(username,usernameError),
		password: hashedVal,
        firstname: parse(firstname,nameError),
        lastname:parse(lastname,nameError)
    } as UserInputType;
    
  
    const user =  new User(userInput);
    await user.save();
};

/*

const update = (): void  => {

}

const remove = (): void  => {

}

const search = (): void  => {

}

*/

export default {
    create
};