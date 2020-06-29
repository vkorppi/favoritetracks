
import typeparsers from '../utils/typeparsers';
import { searchEnv, sessionEnv } from '../types';
import { getMessage } from '../utils/errorFunctions';

const parser = typeparsers.parseString;
const env = process.env;

export const getSearchEnvs = (token: string, track: string, page: number): searchEnv => {

    const parserNum = typeparsers.parseNumber;
    const parserInput = typeparsers.parseStringUserInput;
    
    return {
        querypart1: parser(
            env.QUERYPART1, 
            getMessage('EnvString','QUERYPART1',false)),
        typepart2: parser(
            env.TYPEPART2,
             getMessage('EnvString','TYPEPART2',false)),
        offsetpart3: parser(
            env.OFFSETPART3,
            getMessage('EnvString','OFFSETPART3',false)),
        limitpart4: parser(
            env.LIMITPART4,
            getMessage('EnvString','LIMITPART4',false)),
        offset: parserNum(page,  
            getMessage('number','page',false)) * 10,

        parsedToken: parser(
             token, 
             getMessage('string','token',false)),
        parsedTrack: parserInput(
            track, 
            getMessage('string','track',true))
    };

};


export const getSessionEnvs = (): sessionEnv => {

    return {
        granttype: parser(
             env.GRANTTYPE,
             getMessage('EnvString','GRANTTYPE',false)),
        refreshtoken: parser(
            env.REFRESHTOKEN,
            getMessage('EnvString','REFRESHTOKEN',false)),
        sessionUrl: parser(
            env.SESSIONURL,
            getMessage('EnvString','SESSIONURL',false)),
        code: parser(
            env.CODE,
            getMessage('EnvString','CODE',false)),
        secret: parser(
            env.SECRET,
            getMessage('EnvString','SECRET',false))
    };

};