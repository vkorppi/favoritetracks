
import typeparsers from '../utils/typeparsers';
import { searchEnv, sessionEnv } from '../types';

const errorString = 'Enviroment variable: variable was not a string';

export const getSearchEnvs = (token:string,track:string,page:number): searchEnv  => {

    const querypart1:string=  typeparsers.parseString(process.env.QUERYPART1,errorString);
    const typepart2:string=  typeparsers.parseString(process.env.TYPEPART2,errorString);
    const offsetpart3:string=  typeparsers.parseString(process.env.OFFSETPART3,errorString);
    const limitpart4:string=  typeparsers.parseString(process.env.LIMITPART4,errorString);
    const offset:number= typeparsers.parsePage(page) *10;
    const parsedToken:string = typeparsers.parseString(token,errorString);
    const parsedTrack:string=typeparsers.parseStringUserInput(track,'Track: track was not a string');

    return {
        querypart1:querypart1,
        typepart2:typepart2,
        offsetpart3:offsetpart3,
        limitpart4:limitpart4,
        offset:offset,
        parsedToken:parsedToken,
        parsedTrack:parsedTrack
    };

};


export const getSessionEnvs = (): sessionEnv  => {

    const granttype:string=  typeparsers.parseString(process.env.GRANTTYPE,errorString);
    const refreshtoken:string =  typeparsers.parseString(process.env.REFRESHTOKEN,errorString);
    const sessionUrl:string =  typeparsers.parseString(process.env.SESSIONURL,errorString);
    const code:string =  typeparsers.parseString(process.env.CODE,errorString);
   
    return {
        granttype:granttype,
        refreshtoken:refreshtoken,
        sessionUrl:sessionUrl,
        code:code
    };
    
};