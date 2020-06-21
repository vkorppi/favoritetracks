

import bcrypt from 'bcryptjs';
import typeparsers from '../utils/typeparsers'

const create = (username:string,password:string, firstname: String,lastname: String): void  => {

    password=typeparsers.Parsepassword(password);
    

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
