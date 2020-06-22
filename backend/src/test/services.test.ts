

import spotify from '../services/spotify';
import user from '../services/user';
import fs from 'fs';
import mongoose from 'mongoose';
import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';

 describe('Testing spotify services', () => {

  test('creates session file with expirationtime and token', async () => {

    await spotify.CreateNewSession();

    const fileExists= fs.existsSync('session.txt');
    let filecontent=[];
    
    if(fileExists) {
      filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");
    }

      expect(fileExists).toBe(true);
      expect(filecontent.length).toBe(2);
    });
    
    test('Removes existing file and creates new file with the same name', async () => {

      let filecontent='';

      fs.appendFileSync('session.txt','test');

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

      dateExpire=new Date( date.getTime() + milliseconds );

      fs.appendFileSync('session.txt', 'token'+'\n'+dateExpire.getTime().toString());
      
      expect(spotify.hasSessionExpired()).toBe(false);

      });

    test('If session has expired returns true', () => {

      if (fs.existsSync('session.txt')) {
        fs.unlinkSync('session.txt');
      }

      const milliseconds = 1000 * 60 * 60;
      let dateExpire = new Date();
      const date = new Date();

      dateExpire=new Date( date.getTime() - milliseconds );

      fs.appendFileSync('session.txt', 'token'+'\n'+dateExpire.getTime().toString());
      
      expect(spotify.hasSessionExpired()).toBe(true);
      
    });
    
});

describe.only('Testing usermanagement', () => {



  beforeAll(async () => {

    const parser =typeparsers.parseString;
    const env = process.env;
    const error = 'databser url was not as string';

    const configuration = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    };
  
    await mongoose.connect(parser(env.DBTEST,error), configuration);
  
    
 });
 

  test('User is created to databse',  async () => {


 

    await user.create('user4','password','firstname','lastname');

    

    expect(true).toBe(true);
  });


  
  afterAll( () => {
      void mongoose.connection.close();
      console.log('Database connection closed');
    });
    
});
