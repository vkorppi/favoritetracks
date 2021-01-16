import user from '../../services/user';
import bcrypt from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import {  decodedTokenType } from '../../types/sessionTypes';
import typeparsers from '../../utils/typeparsers';
import mongoose from 'mongoose';
import User from '../../mongo/user';
import {  UserSchemaType } from '../../types/userTypes';
import { hashPassword } from '../../utils/userFunctions';
import dotenv from 'dotenv';

dotenv.config();

describe('Testing usermanagement services', () => {

    const parser = typeparsers.parseString;
  
    beforeAll(async () => {
  
  
      const env = process.env;
  
      const error = 'databseurl url was not as string';
  
      const configuration = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      };
  
      await mongoose.connect(parser(env.DBTEST, error), configuration);
  
    });
  
    beforeEach(async () => {
  
      await User.deleteMany({});
  
      const testuser: UserSchemaType = {
        username: 'usernameTest',
        password: hashPassword('passwordTest'),
        firstname: 'firstnameTest',
        lastname: 'lastnameTest'
      } as UserSchemaType;
  
      const userTest = new User(testuser);
      await userTest.save();
  
      const testuser2: UserSchemaType = {
        username: 'username2daTest',
        password: hashPassword('passworqedTest'),
        firstname: 'firstqwenameTest',
        lastname: 'lastnameTest'
      } as UserSchemaType;
  
      const userTest2 = new User(testuser2);
      await userTest2.save();
  
    });
  
  
    test('User is created to database', async () => {
  
      await user.create('username4', 'password', 'firstname', 'lastname', '11.11.1999', 'test.test@mail.com', 'road 12');
  
      const newuser = await User.findOne({ username: 'username4' });
  
      const password = parser(newuser?.password, 'password was empty');
      const success = await bcrypt.compare('password', password);
  
      expect(newuser?.username).toBe('username4');
      expect(success).toBe(true);
      expect(newuser?.firstname).toBe('firstname');
      expect(newuser?.lastname).toBe('lastname');
      expect(newuser?.birthdate).toBe('11.11.1999');
      expect(newuser?.email).toBe('test.test@mail.com');
      expect(newuser?.address).toBe('road 12');
    });
  
  
    test('Password is updated', async () => {
  
      const fetchedUser = await User.findOne({ username: 'usernameTest' });
  
      await user.updatePassword('newpassword', fetchedUser?.id);
  
      const userNewPass = await User.findOne({ username: 'usernameTest' });
  
      const password = parser(userNewPass?.password, 'password was empty');
  
      const success = await bcrypt.compare('newpassword', password);
  
      expect(success).toBe(true);
    });
  
  
    test('User is updated', async () => {
  
      const fetchedUser = await User.findOne({ username: 'usernameTest' });
  
  
      await user.update('Newfirstname', 'Newlastname', '12.12.2000', 'new.new@mail.com', 'address 123', fetchedUser?.id);
  
      const userNameChanged = await User.findOne({ username: 'usernameTest' });
  
      expect(userNameChanged?.firstname).toBe('Newfirstname');
      expect(userNameChanged?.lastname).toBe('Newlastname');
      expect(userNameChanged?.birthdate).toBe('12.12.2000');
      expect(userNameChanged?.email).toBe('new.new@mail.com');
      expect(userNameChanged?.address).toBe('address 123');
  
    });
  
  
    test('User can be searched', async () => {
  
      const fetchedUser1 = await user.search('firstnameTest');
      const fetchedUser2 = await user.search('lastnameTest');
      const fetchedUser3 = await user.search('usernameTest');
  
      expect(fetchedUser1).toBeTruthy();
      expect(fetchedUser2.length).toBe(2);
      expect(fetchedUser3).toBeTruthy();
  
  
    });
  
  
    test('User gets token when login is succesfull', async () => {
  
      const parser = typeparsers.parseString;
      const env = process.env;
      const secretError = 'was not a string';
  
      const fetchedUser = await User.findOne({ username: 'usernameTest' });
  
      const encodedtoken = await user.login('usernameTest', 'passwordTest');
  
      const decodedtoken = verify(encodedtoken.value, parser(env.SECRET, secretError));
      const jsonToken = decodedtoken as decodedTokenType;
  
      expect(jsonToken.id === fetchedUser?.id).toBe(true);
      expect(jsonToken.username === fetchedUser?.username).toBe(true);
  
    });
  
    test('User is deleted', async () => {
  
      const fetchedUser = await User.findOne({ username: 'usernameTest' });
  
      await user.remove(fetchedUser?.id);
  
      const userNotFound = await User.findOne({ username: 'usernameTest' });
  
  
      expect(userNotFound).toBe(null);
  
    });
  
    test('User can be found with id', async () => {
  
      const fetchedUser = await User.findOne({ username: 'usernameTest' });
  
      const userFound = await user.getUser(fetchedUser?.id);
  
      expect(userFound).toBeTruthy();
  
    });
  
  
    afterAll(async () => {
      await User.deleteMany({});
      void mongoose.connection.close();
      console.log('Database connection closed');
    });
  
  });