
import fs from 'fs';
import typeparsers from '../utils/typeparsers';
import axios from 'axios';
import querystring from 'querystring';

import enviro from 'dotenv';

import { refreshtoken,spotifyResult } from '../types';

enviro.config();

 const hasSessionExpired = (): boolean => {

    try {
        
        if (!fs.existsSync('session.txt')) {
            return true;
        }

        const filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");

        const expiration:number = typeparsers.parseExpiration(filecontent[1]);

        const current = new Date();

        if(current.getTime() < expiration) {
            return false;
        }

        return true;
        
      } catch(err) {
        console.error(err);
        return true;
      }


 };

// metodi try catchen sisaan
const CreateNewSession = async():Promise<void> => {

    const granttype:string=  typeparsers.parseEnvString(process.env.GRANTTYPE);
    const refreshtoken:string =  typeparsers.parseEnvString(process.env.REFRESHTOKEN);
    const sessionUrl:string =  typeparsers.parseEnvString(process.env.SESSIONURL);
    const code:string =  typeparsers.parseEnvString(process.env.CODE);

    if (fs.existsSync('session.txt')) {
        fs.unlinkSync('session.txt');
    }

    const requestBody = {
        "grant_type":  granttype,
        "refresh_token": refreshtoken
    };

    await axios.post(sessionUrl,querystring.stringify(requestBody),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded','authorization': 'Basic '+code} }).then(newtoken => {

       const retrievedToken:refreshtoken= newtoken.data as refreshtoken;

        const milliseconds:number = typeparsers.parseExpiration(retrievedToken.expires_in) * 1000;
        const current = new Date();
        const expirationTime= new Date( current.getTime() + milliseconds );

        fs.appendFileSync('session.txt', retrievedToken.access_token+'\n'+expirationTime.getTime().toString());
     
    });
    
};

 const search = async(track:string,page:number): Promise<spotifyResult>  => {

    if(hasSessionExpired()) {
       await CreateNewSession();
    }
    
    const filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");
    const token:string = typeparsers.parseToken(filecontent[0]);

    const querypart1:string=  typeparsers.parseEnvString(process.env.QUERYPART1);
    const typepart2:string=  typeparsers.parseEnvString(process.env.TYPEPART2);
    const offsetpart3:string=  typeparsers.parseEnvString(process.env.OFFSETPART3);
    const limitpart4:string=  typeparsers.parseEnvString(process.env.LIMITPART4);
    
    const offset:number= typeparsers.parsePage(page) *10;

    const url:string = querypart1+typeparsers.parseTrack(track)+typepart2+offsetpart3+offset.toString()+limitpart4;

    
     return await (await axios.get(url,{ headers: { 'authorization': 'Bearer '+token} })).data as spotifyResult;
    
    };


export default {
    hasSessionExpired,
    CreateNewSession,
    search

};