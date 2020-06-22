
import typeparsers from '../utils/typeparsers';
import { searchEnv, sessionEnv } from '../types';

const errorEnvString = 'Enviroment variable: variable was not a string';
const errorEnvNumber = 'Enviroment variable: variable was not a number';
const parser = typeparsers.parseString;
const env = process.env;

export const getSearchEnvs = (token: string, track: string, page: number): searchEnv => {

    const parserNum = typeparsers.parseNumber;
    const parserInput = typeparsers.parseStringUserInput;
    
    return {
        querypart1: parser(env.QUERYPART1, errorEnvString),
        typepart2: parser(env.TYPEPART2, errorEnvString),
        offsetpart3: parser(env.OFFSETPART3, errorEnvString),
        limitpart4: parser(env.LIMITPART4, errorEnvString),
        offset: parserNum(page, errorEnvNumber) * 10,
        parsedToken: parser(token, 'Token: token was not a string'),
        parsedTrack: parserInput(track, 'Track: track was not a string')

    };

};


export const getSessionEnvs = (): sessionEnv => {

    return {
        granttype: parser(env.GRANTTYPE, errorEnvString),
        refreshtoken: parser(env.REFRESHTOKEN, errorEnvString),
        sessionUrl: parser(env.SESSIONURL, errorEnvString),
        code: parser(env.CODE, errorEnvString)
    };

};