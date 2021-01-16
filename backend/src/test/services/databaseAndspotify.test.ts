

import spotify from '../../services/spotify';
import mongoose from 'mongoose';
import typeparsers from '../../utils/typeparsers';
import User from '../../mongo/user';
import {  UserSchemaType } from '../../types/userTypes';


import dotenv from 'dotenv';
import { hashPassword } from '../../utils/userFunctions';

dotenv.config();

describe('Testing services that use database and spotify', () => {

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

    await User.deleteMany({});

    const testuser: UserSchemaType = {
      username: 'user919',
      password: hashPassword('passwordTest'),
      firstname: 'firstnameTest',
      lastname: 'lastnameTest'
    } as UserSchemaType;

    const userTest = new User(testuser);
    await userTest.save();

  });

 

  test("service updates user's favorites with created trackslist", async () => {

    const fetchedUser = await User.findOne({ username: 'user919' });

    await spotify.CreateList('user919', fetchedUser?.id);

    const fetchedUser2 = await User.findOne({ username: 'user919' });

    expect(fetchedUser2?.favorites).toBeTruthy();

  });


  test("service adds tracks to user's list and does not fail", async () => {

    const fetchedUser = await User.findOne({ username: 'user919' });

    await spotify.AddToList(
      [
        'spotify:track:59LSFQW38CnzJylvtYJKJu',
        'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
      ],
      fetchedUser?.id);

    const fetchedUser2 = await User.findOne({ username: 'user919' });

    expect(fetchedUser2?.favorites).toBeTruthy();

  });
  

  test("Added tracks can be fetched from spotify", async () => {


    const fetchedUser = await User.findOne({ username: 'user919' });

    const id = fetchedUser?.id as string;

    const list =await spotify.GetList(id);

    expect(list.items.length).toBe(2);

  });

  

  test("service removes added tracks", async () => {

    const fetchedUser = await User.findOne({ username: 'user919' });

    const id = fetchedUser?.id as string;

    await spotify.removeItem(id,[
      'spotify:track:59LSFQW38CnzJylvtYJKJu',
      'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
    ]);

    const list =await spotify.GetList(id);

    expect(list.items.length).toBe(0);

  });
  


  afterAll(async () => {
    await User.deleteMany({});
    void mongoose.connection.close();
    console.log('Database connection closed');
  });

});