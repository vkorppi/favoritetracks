
import spotify from '../services/spotify';
import fs from 'fs';

 describe('Testing spotify services', () => {

  test('creates session file with expirationtime and token', () => {

    void spotify.CreateNewSession();

    const fileExists= fs.existsSync('session.txt');
    let filecontent=[];
    
    if(fileExists) {
      filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");
    }

      expect(fileExists).toBe(true);
      expect(filecontent.length).toBe(2);
    });
    
    test('Removes existing file and creates new file with the same name', () => {

      let filecontent='';

      fs.appendFileSync('session.txt','test');

      void spotify.CreateNewSession();

      filecontent = fs.readFileSync('session.txt', 'utf8').toString();

      expect(!filecontent.includes('test')).toBe(true);
      
    });

    test('If session has expired returns true', () => {

		// ...
    });
    
    test('If session has not expired returns false', () => {

		// ...
    });
    
    test('Returns promise that can be used fetch data that has type spotifyResult', () => {

		// ...
    });

});