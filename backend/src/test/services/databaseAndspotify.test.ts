

import spotify from '../../services/spotify';
import mongoose from 'mongoose';
import typeparsers from '../../utils/typeparsers';
import User from '../../mongo/user';
import Track from '../../mongo/track';
import { UserSchemaType } from '../../types/userTypes';
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

    //await User.deleteMany({});
    await User.deleteMany({ "username": { $nin: ["adminUser"] } });

    const testuser: UserSchemaType = {
      username: 'user919',
      password: hashPassword('passwordTest'),
      firstname: 'firstnameTest',
      lastname: 'lastnameTest',

    } as UserSchemaType;

    const userTest = new User(testuser);
    await userTest.save();

  });

  /*
    test("testing purpose", async () => {
  
      const fetchedUser = await User.findOne({ username: 'user919' });
  
      await spotify.AddToList(
        [
          { name: 'test', url: "http://test" },
          { name: 'test2', url: "http://test2" }
        ],
        fetchedUser?.id);
  
        
      const test = await spotify.GetFavorites(fetchedUser?.id);
  
  
      test?.map((track) => (
  
        console.log(track.url)
      ));
      
  
     const fetchedUser2 = await User.findOne({ username: 'user919' });
  
      //await spotify.removeItem(fetchedUser?.id, { name: 'test', url: "http://test" });
  
  
      expect(true).toBeTruthy();
  
    });
    */




  /*
    Tarkistettava, että tarvitaanko enää
  
    test("service updates user's favorites with created trackslist", async () => {
  
      const fetchedUser = await User.findOne({ username: 'user919' });
  
      await spotify.CreateList('user919', fetchedUser?.id);
  
      const fetchedUser2 = await User.findOne({ username: 'user919' });
  
      expect(fetchedUser2?.favorites).toBeTruthy();
  
    });
    */



  test("service adds tracks to user's list and does not fail", async () => {

    const fetchedUser = await User.findOne({ username: 'user919' });

    await spotify.add(
      [
        { name: 'test', url: 'http://testi.com',spotifUri:'someUri1' },
        { name: 'test2', url: 'http://testi2.com',spotifUri:'someUri2' }
      ],
      fetchedUser?.id);

    const fetchedUser2 = await User.findOne({ username: 'user919' });

    expect(fetchedUser2?.favorites).toBeTruthy();

  });



  test("Added tracks can be fetched from spotify", async () => {

    const fetchedUser = await User.findOne({ username: 'user919' });

    const list = await spotify.GetFavorites(fetchedUser?.id);

    expect(list?.length).toBe(2);

  });



  test("service removes added tracks", async () => {

    const fetchedUser = await User.findOne({ username: 'user919' });

    const id = fetchedUser?.id as string;

    await spotify.removeTrack(id, 
      { name: 'test2', url: 'http://testi2.com',spotifUri:'someUri2' }
    );

    const list = await spotify.GetFavorites(id);

    expect(list?.length).toBe(1);

  });



  afterAll(async () => {
    //await User.deleteMany({});
    await Track.deleteMany({});
    await User.deleteMany({ "username": { $nin: ["adminUser"] } });
    void mongoose.connection.close();
    console.log('Database connection closed');
  });

});