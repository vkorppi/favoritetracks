
import fs from 'fs';
import typeparsers from '../utils/typeparsers';
import axios from 'axios';
import querystring from 'querystring';

import enviro from 'dotenv';
import {getSearchEnvs,getSessionEnvs} from '../utils/envFunctions';
import {getTokenExpirationTime} from '../utils/sessionFunctions';

import { refreshtoken,spotifyResult, searchResult } from '../types';
import { getMessage } from '../utils/errorFunctions';


enviro.config();

 const hasSessionExpired = (): boolean => {

    try {
        
        if (!fs.existsSync('session.txt')) {
            return true;
        }

        const filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");

        const expiration:number = typeparsers.parseNumber(filecontent[1],getMessage('string','Expiration time',false));
        
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

const CreateNewSession = async():Promise<void> => {


    if (fs.existsSync('session.txt')) {
        fs.unlinkSync('session.txt');
    }

    const env = getSessionEnvs();

    const requestBody = {
        "grant_type":  env.granttype,
        "refresh_token": env.refreshtoken
    };

    const headers={ 
        'Content-Type': 'application/x-www-form-urlencoded'
        ,'authorization': 'Basic '+env.code
    };

    await axios.post(env.sessionUrl,querystring.stringify(requestBody),
    { headers:  headers}).then(newtoken => {

       const retrievedToken:refreshtoken= newtoken.data as refreshtoken;
       
       fs.appendFileSync(
           'session.txt',
            retrievedToken.access_token
            +'\n'+ 
            getTokenExpirationTime(retrievedToken)
        );
     
    });
    
};

 const search = async(track:string,page:number): Promise<spotifyResult>  => {

    
    if(hasSessionExpired()) {
       await CreateNewSession();
    }
    
    const filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");

    const envs=getSearchEnvs(filecontent[0],track,page);
 
    const url:string = envs.querypart1
    +envs.parsedTrack+envs.typepart2
    +envs.offsetpart3
    +envs.offset.toString()
    +envs.limitpart4;

    
     return await (await axios.get(
         url,
        { headers: { 'authorization': 'Bearer '+envs.parsedToken} }
    
    )).data as spotifyResult;
    
    };
    
    const test = (track:string,page:number): searchResult  => {
        

        if(page > 10) {
			
            track = `${track}_${page}`;
			
        }

        let testdata = {
            "tracks": [
                "test1",
                "test2",
                "test3",
                "test4",
                "test5",
                "test6",
                "test7",
                "test8",
                "test9",
				"test10"
            ],
            "total": 90
        };

        switch(track) {
            case "Test_TotalUnderTen":
              testdata = {
                "tracks": [
                    "test1",
                    "test2",
                    "test3",
                    "test4",
                    "test5"
                ],
                "total": 5
            };
              break;
            case "Test_Total15":
                testdata = {
                    "tracks": [
                        "test1",
                        "test2",
                        "test3",
                        "test4",
                        "test5",
                        "test6",
                        "test7",
                        "test8",
                        "test9",
                        "test10",
                    ],
                    "total": 15
                };
              break;
              case "Test_Total15_11":
                testdata = {
                    "tracks": [
                        "test11",
                        "test12",
                        "test13",
                        "test14",
                        "test15"
                    ],
                    "total": 15
                };
              break;
          } 

        return testdata;
    };
    
    
export default {
    hasSessionExpired,
    CreateNewSession,
    search,
    test
};