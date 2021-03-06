

import spotify from '../../services/spotify';
import fs from 'fs';

describe('Testing spotify services', () => {

    test('creates session file with expirationtime and token', async () => {
  
      await spotify.session.system.CreateNewSession();
  
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
  
      await spotify.session.system.CreateNewSession();
  
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
  
      expect(spotify.session.system.hasSessionExpired()).toBe(false);
  
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
  
      expect(spotify.session.system.hasSessionExpired()).toBe(true);
  
    });
  
  });