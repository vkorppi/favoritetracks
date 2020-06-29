
import typeparsers from '../utils/typeparsers';
import { searchEnv, sessionEnv, playListEnv } from '../types';
import { getMessage } from '../utils/errorFunctions';

const parser = typeparsers.parseString;
const env = process.env;

export const getSearchEnvs = (): searchEnv => {

    return {
        querypart1: parser(
            env.QUERYPART1,
            getMessage('EnvString', 'QUERYPART1', false)),
        typepart2: parser(
            env.TYPEPART2,
            getMessage('EnvString', 'TYPEPART2', false)),
        offsetpart3: parser(
            env.OFFSETPART3,
            getMessage('EnvString', 'OFFSETPART3', false)),
        limitpart4: parser(
            env.LIMITPART4,
            getMessage('EnvString', 'LIMITPART4', false))
    };

};


export const getSessionEnvs = (): sessionEnv => {

    return {
        granttype: parser(
            env.GRANTTYPE,
            getMessage('EnvString', 'GRANTTYPE', false)),
        refreshtoken: parser(
            env.REFRESHTOKEN,
            getMessage('EnvString', 'REFRESHTOKEN', false)),
        sessionUrl: parser(
            env.SESSIONURL,
            getMessage('EnvString', 'SESSIONURL', false)),
        code: parser(
            env.CODE,
            getMessage('EnvString', 'CODE', false)),
        secret: parser(
            env.SECRET,
            getMessage('EnvString', 'SECRET', false))
    };

};

export const getPlayListEnvs = (): playListEnv => {

    return {
        userid: parser(
            env.USERID,
            getMessage('EnvString', 'USERID', false)),
        playlistpart1: parser(
            env.PLAYLISTPART1,
            getMessage('EnvString', 'PLAYLISTPART1', false)),
        playlistpart3: parser(
            env.PLAYLISTPART3,
            getMessage('EnvString', 'PLAYLISTPART3', false)),
    };

};