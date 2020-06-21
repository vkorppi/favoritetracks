
import typeparsers from '../utils/typeparsers';
import { searchEnv, sessionEnv } from '../types';

export const getSearchEnvs = (token:string,track:string,page:number): searchEnv  => {

    const querypart1:string=  typeparsers.parseEnvString(process.env.QUERYPART1);
    const typepart2:string=  typeparsers.parseEnvString(process.env.TYPEPART2);
    const offsetpart3:string=  typeparsers.parseEnvString(process.env.OFFSETPART3);
    const limitpart4:string=  typeparsers.parseEnvString(process.env.LIMITPART4);
    const offset:number= typeparsers.parsePage(page) *10;
    const parsedToken:string = typeparsers.parseToken(token);
    const parsedTrack:string=typeparsers.parseTrack(track);

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

    const granttype:string=  typeparsers.parseEnvString(process.env.GRANTTYPE);
    const refreshtoken:string =  typeparsers.parseEnvString(process.env.REFRESHTOKEN);
    const sessionUrl:string =  typeparsers.parseEnvString(process.env.SESSIONURL);
    const code:string =  typeparsers.parseEnvString(process.env.CODE);
   
    return {
        granttype:granttype,
        refreshtoken:refreshtoken,
        sessionUrl:sessionUrl,
        code:code
    };
    
};