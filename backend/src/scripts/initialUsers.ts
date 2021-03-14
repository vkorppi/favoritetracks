import User from '../mongo/user';
import {  UserSchemaType } from '../types/userTypes';
import { hashPassword } from '../utils/userFunctions';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import typeparsers from '../utils/typeparsers';

dotenv.config();

const env = process.env;
const error = 'databseurl url was not as string';
const parser = typeparsers.parseString;

const configuration = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

const setTestUser = async (): Promise<void> => {

    await mongoose.connect(parser(env.DBTEST, error), configuration);
    
    const adminUser: UserSchemaType = {     
        username: 'adminUser',
        password: hashPassword('admin'),
        firstname: 'admin',
        lastname: 'admin',
        birthdate: '11.11.1999',
        email: 'test.test@mail.com',
        address: 'road 12',  
        admin:true
      } as UserSchemaType;
  
      const admin = new User(adminUser);
      await admin.save();
	  
      await mongoose.disconnect()
};


const setAdminUser = async (): Promise<void> => {

    await mongoose.connect(parser(env.DBTEST, error), configuration);
    
    const adminUser: UserSchemaType = {     
        username: 'adminUser',
        password: hashPassword('password'),
        firstname: 'admin',
        lastname: 'admin',
        birthdate: '11.11.1999',
        email: 'test.test@mail.com',
        address: 'road 12',  
        admin:true
      } as UserSchemaType;
  
      const admin = new User(adminUser);
      await admin.save();
	  
      await mongoose.disconnect()
};


setTestUser()
// setAdminUser
