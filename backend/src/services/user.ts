

import bcrypt from 'bcryptjs';
 import typeparsers from '../utils/typeparsers'

const create = (username:string,password:string, firstname: String,lastname: String): void  => {

    typeparsers.parseString(username,'username: username was not a string');
    typeparsers.parseString(password);
    typeparsers.parseString(firstname);
    typeparsers.parseString(lastname);

    const hashedVal =  bcrypt.hashSync(password,10);

    // add user to database

}

/*

const update = (): void  => {

}

const remove = (): void  => {

}

const search = (): void  => {

}

*/
