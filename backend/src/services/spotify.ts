
import fs from 'fs';
import typeparsers from '../utils/typeparsers';
import axios from 'axios';
import querystring from 'querystring';
import Track from '../mongo/track';
import User from '../mongo/user';
import enviro from 'dotenv';
import { getSearchEnvs, getSessionEnvs, getPlayListEnvs, getTracktEnvs } from '../utils/envFunctions';
import { favorites, favoritesSearchResult, trackObject, TrackSchemaType } from '../types/favoritesTypes';
import { spotifyResult, searchResult } from '../types/searchType';
import { getMessage } from '../utils/errorFunctions';
import user from '../services/user';
import { refreshtoken, spotifyToken } from '../types/sessionTypes';
import { UserSchemaType } from '../types/userTypes';


enviro.config();
const parserNum = typeparsers.parseNumber;
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

const search = async (track: string, page: number): Promise<spotifyResult> => {


    if (hasSessionExpired()) {
        await CreateNewSession();
    }

    const token = getSessionToken();

    const envs = getSearchEnvs();

    const pageError = getMessage('number', page.toString(), false);
    const offset = (parserNum(page, pageError) - 1) * 10;

    const trackError = getMessage('string', track, true);
    const parsedTrack = parserString(track, trackError);

    const url: string = envs.querypart1
        + parsedTrack + envs.typepart2
        + envs.offsetpart3
        + offset.toString()
        + envs.limitpart4;


    return await (await axios.get(
        url,
        { headers: { 'authorization': 'Bearer ' + token } }

    )).data as spotifyResult;

};

const AddToList = async (tracks: trackObject[], userId: string): Promise<void> => {

    const urls: string[] = [];

    await Track.bulkWrite(
        tracks.map((track) =>
        (
            urls.push(track.url),
            {
                updateOne: {
                    filter: { url: track.url, name: track.name, spotifUri: track.spotifUri },
                    update: { $push: { users: userId } },
                    upsert: true
                }
            })
        )
    );

    const ids: string[] = await Track.find({ url: { $in: urls } }).distinct('_id') as string[];

    await User.updateOne(
        { _id: userId },
        { $addToSet: { favorites: { $each: ids } } }
    );

};


/*
const AddToList = async (tracks: string[], userId: string): Promise<void> => {

    if (hasSessionExpired()) {
        await CreateNewSession();
    }

    const { trackpart1, trackpart3 } = getTracktEnvs();

    const token = getSessionToken();
    let listid = '';

    
    const fetcheduser = await user.getUser(userId);
    listid = fetcheduser?.favorites as string;


    if (!listid) {

        const username = fetcheduser?.username as string;
        const id = fetcheduser?.id as string;

        listid = await CreateList(username, id) as string;

    }


    const url = trackpart1 + listid + trackpart3;

    const requestBody = {
        "uris": tracks
    };

    const headers = {
        'Content-Type': 'application/json'
        , 'authorization': 'Bearer ' + token
    };

    await axios.post(url, requestBody, { headers: headers });

};

*/


const CreateList = async (name: string, userid: string): Promise<string | void | Error> => {

    const { accountId, playlistpart1, playlistpart3 } = getPlayListEnvs();

    if (hasSessionExpired()) {
        await CreateNewSession();
    }

    const url = playlistpart1 + accountId + playlistpart3;

    const token = getSessionToken();

    const requestBody = {
        "name": name,
        "description": "Tracks",
        "public": false
    };

    const headers = {
        'Content-Type': 'application/json'
        , 'authorization': 'Bearer ' + token
    };

    return await axios.post(url, requestBody,
        { headers: headers }).then(async response => {

            const list = response.data as favorites;
            await user.addList(list.id, userid);
            return list.id;
        });
};


/*
const GetList = async (userId: string): Promise<favoritesSearchResult> => {

    if (hasSessionExpired()) {
        await CreateNewSession();
    }

    const token = getSessionToken();

    const { trackpart1, trackpart3 } = getTracktEnvs();

    let listid = '';

    const fetcheduser = await user.getUser(userId);
    listid = fetcheduser?.favorites as string;

    const url = trackpart1 + listid + trackpart3;

    return await (await axios.get(
        url,
        { headers: { 'authorization': 'Bearer ' + token } }

    )).data as favoritesSearchResult;


};

*/

const GetList = async (userId: string): Promise<TrackSchemaType[] | null> => {


    const favorites = await User.findOne({ _id: userId }).populate('favorites');

    return (favorites?.favorites as unknown) as TrackSchemaType[];
};



const removeItem = async (userId: string, track: trackObject): Promise<string | void> => {

    await Track.updateOne(
        { url: track.url },
        { $pull: { users: userId } }
    );


    const id: string[] = await Track.findOne({ url: track.url }).distinct('_id') as string[];

    await User.updateOne(
        { _id: userId },
        { $pullAll: { favorites: id } }
    );

};

/*
const removeItem = async (userId: string, tracks: string[]): Promise<string | void> => {

    if (hasSessionExpired()) {
        await CreateNewSession();
    }

    const token = getSessionToken();

    const { trackpart1, trackpart3 } = getTracktEnvs();

    let listid = '';

    const fetcheduser = await user.getUser(userId);
    listid = fetcheduser?.favorites as string;

    const url = trackpart1 + listid + trackpart3;

    const requestBody = {
        "uris": tracks
    };

    const headers = {
        'Content-Type': 'application/json'
        , 'authorization': 'Bearer ' + token
    };

    return await axios.delete(url, { data: requestBody, headers: headers });

};
*/

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




const test = (track: string, page: number): searchResult => {


    if (page > 10) {

        track = `${track}_${page}`;

    }

    let testdata = {
        "tracks": [
            { name: 'test1', uri: 'test1uri', external_urls: { spotify: 'url1' } },
            { name: 'test2', uri: 'test2uri', external_urls: { spotify: 'url2' } },
            { name: 'test3', uri: 'test3uri', external_urls: { spotify: 'url3' } },
            { name: 'test4', uri: 'test4uri', external_urls: { spotify: 'url4' } },
            { name: 'test5', uri: 'test5uri', external_urls: { spotify: 'url5' } }
        ],
        "total": 90
    };


    switch (track) {
        case "Test_Totalfive":
            testdata = {
                "tracks": [
                    { name: 'test1', uri: 'test1uri', external_urls: { spotify: 'url1' } },
                    { name: 'test2', uri: 'test2uri', external_urls: { spotify: 'url2' } },
                    { name: 'test3', uri: 'test3uri', external_urls: { spotify: 'url3' } },
                    { name: 'test4', uri: 'test4uri', external_urls: { spotify: 'url4' } },
                    { name: 'test5', uri: 'test5uri', external_urls: { spotify: 'url5' } }
                ],
                "total": 5
            };
            break;
        case "Test_TotalOverHundred":
            testdata = {
                "tracks": [
                    { name: 'test1', uri: 'test1uri', external_urls: { spotify: 'url1' } },
                    { name: 'test2', uri: 'test2uri', external_urls: { spotify: 'url2' } },
                    { name: 'test3', uri: 'test3uri', external_urls: { spotify: 'url3' } },
                    { name: 'test4', uri: 'test4uri', external_urls: { spotify: 'url4' } },
                    { name: 'test5', uri: 'test5uri', external_urls: { spotify: 'url5' } },
					{ name: 'test6', uri: 'test6uri', external_urls: { spotify: 'url6' } },
					{ name: 'test7', uri: 'test7uri', external_urls: { spotify: 'url7' } },
					{ name: 'test8', uri: 'test8uri', external_urls: { spotify: 'url8' } },
					{ name: 'test9', uri: 'test9uri', external_urls: { spotify: 'url9' } },
					{ name: 'test10', uri: 'test10uri', external_urls: { spotify: 'url10' } }
                ],
                "total": 120
            };
            break;
        case "Test_Total20":
            testdata = {
                "tracks": [
                    { name: 'test1', uri: 'test1uri', external_urls: { spotify: 'url1' } },
                    { name: 'test2', uri: 'test2uri', external_urls: { spotify: 'url2' } },
                    { name: 'test3', uri: 'test3uri', external_urls: { spotify: 'url3' } },
                    { name: 'test4', uri: 'test4uri', external_urls: { spotify: 'url4' } },
                    { name: 'test5', uri: 'test5uri', external_urls: { spotify: 'url5' } }
                ],
                "total": 20
            };
            break;
        case "Test_Transfer":
            testdata = {
                "tracks": [
                    { name: process.env.TEST_TRACK1 as string, uri: process.env.TEST_TRACK1_URI as string, external_urls: { spotify: 'url1' } },
                    { name: process.env.TEST_TRACK2 as string, uri: process.env.TEST_TRACK2_URI as string, external_urls: { spotify: 'url2' } },
                    { name: process.env.TEST_TRACK3 as string, uri: process.env.TEST_TRACK3_URI as string, external_urls: { spotify: 'url3' } },
                    { name: process.env.TEST_TRACK4 as string, uri: process.env.TEST_TRACK4_URI as string, external_urls: { spotify: 'url4' } }
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
    AddToList,
    CreateList,
    GetList,
    test,
    removeItem,
    delegateToken,
    delegateRefreshedToken
};