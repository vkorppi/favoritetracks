import typeparsers from '../utils/typeparsers';
import enviro from 'dotenv';
import { refreshtoken, spotifyToken } from '../types/sessionTypes';
import fs from 'fs';
import axios from 'axios';
import { getSessionEnvs } from '../utils/envFunctions';
import { getMessage } from '../utils/errorFunctions';
import querystring from 'querystring';

enviro.config();

const parserString = typeparsers.parseString;

const getTokenExpirationTime = (token: refreshtoken): string => {

    const parser = typeparsers.parseNumber;
    const errorMessage = 'Expiration time: Expiration time was not a number';

    const milliseconds: number = parser(token.expires_in, errorMessage) * 1000;
    const current = new Date();
    const expirationTime = new Date(current.getTime() + milliseconds);
    return expirationTime.getTime().toString();
};

const getSessionToken = (): string => {

    const filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");
    const token = filecontent[0];
    const tokenError = getMessage('string', token, false);
    return parserString(token, tokenError);
};

const hasSessionExpired = (): boolean => {

    try {

        if (!fs.existsSync('session.txt')) {
            return true;
        }

        const filecontent = fs.readFileSync('session.txt', 'utf8').toString().split("\n");

        const expiration: number = typeparsers.parseNumber(filecontent[1], getMessage('string', 'Expiration time', false));

        const current = new Date();

        if (current.getTime() < expiration) {
            return false;
        }

        return true;

    } catch (err) {
        console.error(err);
        return true;
    }
};

const CreateNewSession = async (): Promise<void> => {


    if (fs.existsSync('session.txt')) {
        fs.unlinkSync('session.txt');
    }

    const env = getSessionEnvs();

    const requestBody = {
        "grant_type": env.granttype,
        "refresh_token": env.refreshtoken
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
        , 'authorization': 'Basic ' + env.code
    };

    await axios.post(env.sessionUrl, querystring.stringify(requestBody),
        { headers: headers }).then(newtoken => {

            const retrievedToken: refreshtoken = newtoken.data as refreshtoken;

            fs.appendFileSync(
                'session.txt',
                retrievedToken.access_token
                + '\n' +
                getTokenExpirationTime(retrievedToken)
            );

        });

};

const delegateToken = async (spotifyCode: string): Promise<spotifyToken | void> => {

    const { sessionUrl, redirect_uri, granttype_code, code } = getSessionEnvs();




    const requestBody = {
        "grant_type": granttype_code,
        "code": spotifyCode,
        "redirect_uri": redirect_uri
    };


    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
        , 'authorization': 'Basic ' + code
    };


    return await axios.post(sessionUrl, querystring.stringify(requestBody),
        { headers: headers }).then(response => {


            return response.data as spotifyToken;

        });


};

const delegateRefreshedToken = async (refreshToken: string): Promise<refreshtoken> => {


    const env = getSessionEnvs();

    const requestBody = {
        "grant_type": env.granttype,
        "refresh_token": refreshToken
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
        , 'authorization': 'Basic ' + env.code
    };

    return await axios.post(env.sessionUrl, querystring.stringify(requestBody),
        { headers: headers }).then(newtoken => {

            return newtoken.data as refreshtoken;

        });

};

const user = {
    "delegateToken": delegateToken,
    "delegateRefreshedToken": delegateRefreshedToken
};

const system = {
    "getSessionToken": getSessionToken,
    "hasSessionExpired": hasSessionExpired,
    "CreateNewSession": CreateNewSession,
    "getTokenExpirationTime": getTokenExpirationTime
};

export const session = {
    "user": user,
    "system": system
};

export default {
    session
};