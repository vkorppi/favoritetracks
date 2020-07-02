import bcrypt from 'bcryptjs';
import typeparsers from '../utils/typeparsers';

const passwordError ='userInput: password: password was not a string';

export const hashPassword = (password:string): string  => {

    const parse = typeparsers.parseString;
    return bcrypt.hashSync(parse(password,passwordError),10);

};