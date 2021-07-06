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
  
const clear = async (): Promise<void> => {
	
	await mongoose.connect(parser(env.DBTEST, error), configuration);
    await User.deleteMany();
    void mongoose.connection.close();
};

const setAdminUser = async (): Promise<void> => {

    await mongoose.connect(parser(env.DBTEST, error), configuration);
    
    const adminUser: UserSchemaType = {     
        username: 'adminUser',
        password: hashPassword('admin'),
        firstname: 'admin',
        lastname: 'admin',
        birthdate: '11.11.1999',
        email: 'test.test@mail.com',
        address: 'Road 12',  
        admin:true,
		sessionid:''
      } as UserSchemaType;
  
      const admin = new User(adminUser);
      await admin.save();
	  
      await mongoose.disconnect()
};


const setTestUser = async (): Promise<void> => {

    await mongoose.connect(parser(env.DBTEST, error), configuration);
    
    const User3: UserSchemaType = {     
        username: 'usernameTest',
        password: hashPassword('Password'),
        firstname: 'User',
        lastname: 'User',
        birthdate: '11.11.1999',
        email: 'test.test@mail.com',
        address: 'Road 12',  
        admin:false,
		sessionid:''
      } as UserSchemaType;
  
      const newuser = new User(User3);
      await newuser.save();
	  
      await mongoose.disconnect()
};

const initUsers = async (): Promise<void> => {
	await clear()
	await setTestUser()
	await setAdminUser()
};

initUsers()

