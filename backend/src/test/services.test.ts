

import spotify from '../services/spotify';
import user from '../services/user';
import fs from 'fs';
import mongoose from 'mongoose';
import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import bcrypt from 'bcryptjs';
import  {verify}  from 'jsonwebtoken';
import { DecodedToken, UserInputType } from '../types';


import dotenv from 'dotenv';
import { hashPassword } from '../utils/userFunctions';

dotenv.config();

describe('Testing spotify services', () => {

  test('creates session file with expirationtime and token', async () => {

    await spotify.CreateNewSession();

    const fileExists = fs.existsSync('session.txt');
    let filecontent = [];

    if (fileExists) {
      filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");
    }

    expect(fileExists).toBe(true);
    expect(filecontent.length).toBe(2);
  });

  test('Removes existing file and creates new file with the same name', async () => {

    let filecontent = '';

    fs.appendFileSync('session.txt', 'test');

    await spotify.CreateNewSession();

    filecontent = fs.readFileSync('session.txt', 'utf8').toString();

    expect(!filecontent.includes('test')).toBe(true);

  });


  test('If session has not expired returns false', () => {

    if (fs.existsSync('session.txt')) {
      fs.unlinkSync('session.txt');
    }

    const milliseconds = 1000 * 60 * 60;
    let dateExpire = new Date();
    const date = new Date();

    dateExpire = new Date(date.getTime() + milliseconds);

    fs.appendFileSync('session.txt', 'token' + '\n' + dateExpire.getTime().toString());

    expect(spotify.hasSessionExpired()).toBe(false);

  });

  test('If session has expired returns true', () => {

    if (fs.existsSync('session.txt')) {
      fs.unlinkSync('session.txt');
    }

    const milliseconds = 1000 * 60 * 60;
    let dateExpire = new Date();
    const date = new Date();

    dateExpire = new Date(date.getTime() - milliseconds);

    fs.appendFileSync('session.txt', 'token' + '\n' + dateExpire.getTime().toString());

    expect(spotify.hasSessionExpired()).toBe(true);

  });

});

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

		const testuser: UserInputType = {
			username: 'usernameTest',
			password: hashPassword('passwordTest'),
			firstname: 'firstnameTest',
			lastname: 'lastnameTest'
		} as UserInputType;

		const userTest = new User(testuser);
    await userTest.save();
    
    const testuser2: UserInputType = {
			username: 'username2daTest',
			password: hashPassword('passworqedTest'),
			firstname: 'firstqwenameTest',
			lastname: 'lastnameTest'
		} as UserInputType;

		const userTest2 = new User(testuser2);
		await userTest2.save();

	});


  test('User is created to database', async () => {

    await user.create('username4', 'password', 'firstname', 'lastname');

    const newuser = await User.findOne({ username: 'username4' });

    const password = parser(newuser?.password, 'password was empty');
    const success = await bcrypt.compare('password', password);

    expect(newuser?.username).toBe('username4');
    expect(success).toBe(true);
    expect(newuser?.firstname).toBe('firstname');
    expect(newuser?.lastname).toBe('lastname');
  });

  
  test('Password is updated', async () => {

    const fetchedUser = await User.findOne({ username: 'usernameTest' });

    await user.updatePassword('newpassword', fetchedUser?.id);

    const userNewPass = await User.findOne({ username: 'usernameTest' });

    const password = parser(userNewPass?.password, 'password was empty');

    const success = await bcrypt.compare('newpassword', password);

    expect(success).toBe(true);
  });


  test('Name is updated', async () => {

    const fetchedUser = await User.findOne({ username: 'usernameTest' });
    
    await user.updateName('Newfirstname', 'Newlastname', fetchedUser?.id);

    const userNameChanged = await User.findOne({ username: 'usernameTest' });

    expect(userNameChanged?.firstname).toBe('Newfirstname');
    expect(userNameChanged?.lastname).toBe('Newlastname');

  });
 

  test('User can be searched', async () => {

    const fetchedUser1 =await user.search('firstnameTest');
    const fetchedUser2 =await user.search('lastnameTest');
    const fetchedUser3 =await user.search('usernameTest');

    expect(fetchedUser1).toBeTruthy();
    expect(fetchedUser2.length).toBe(2);
    expect(fetchedUser3).toBeTruthy();


  });
   

  test('User gets token when login is succesfull', async () => {

    const parser = typeparsers.parseString;
    const env = process.env;
    const secretError='was not a string';

    const fetchedUser = await User.findOne({ username: 'usernameTest' });

    const encodedtoken = await user.login('usernameTest','passwordTest');

    const decodedtoken = verify(encodedtoken.value,parser(env.SECRET,secretError));
    const jsonToken=decodedtoken as DecodedToken;
    
    expect(jsonToken.id === fetchedUser?.id).toBe(true);
    expect(jsonToken.username === fetchedUser?.username).toBe(true);

  });

  test('User is deleted', async () => {

    const fetchedUser = await User.findOne({ username: 'usernameTest' });

    await user.remove(fetchedUser?.id);

    const userNotFound=await User.findOne({ username: 'usernameTest' });


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
