"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const typeparsers_1 = __importDefault(require("../utils/typeparsers"));
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const dotenv_1 = __importDefault(require("dotenv"));
const envFunctions_1 = require("../utils/envFunctions");
const errorFunctions_1 = require("../utils/errorFunctions");
const user_1 = __importDefault(require("../services/user"));
dotenv_1.default.config();
const parserNum = typeparsers_1.default.parseNumber;
const parserString = typeparsers_1.default.parseString;
const getTokenExpirationTime = (token) => {
    const parser = typeparsers_1.default.parseNumber;
    const errorMessage = 'Expiration time: Expiration time was not a number';
    const milliseconds = parser(token.expires_in, errorMessage) * 1000;
    const current = new Date();
    const expirationTime = new Date(current.getTime() + milliseconds);
    return expirationTime.getTime().toString();
};
const getSessionToken = () => {
    const filecontent = fs_1.default.readFileSync('session.txt', 'utf8').toString().split("\n");
    const token = filecontent[0];
    const tokenError = errorFunctions_1.getMessage('string', token, false);
    return parserString(token, tokenError);
};
const hasSessionExpired = () => {
    try {
        if (!fs_1.default.existsSync('session.txt')) {
            return true;
        }
        const filecontent = fs_1.default.readFileSync('session.txt', 'utf8').toString().split("\n");
        const expiration = typeparsers_1.default.parseNumber(filecontent[1], errorFunctions_1.getMessage('string', 'Expiration time', false));
        const current = new Date();
        if (current.getTime() < expiration) {
            return false;
        }
        return true;
    }
    catch (err) {
        console.error(err);
        return true;
    }
};
const CreateNewSession = () => __awaiter(void 0, void 0, void 0, function* () {
    if (fs_1.default.existsSync('session.txt')) {
        fs_1.default.unlinkSync('session.txt');
    }
    const env = envFunctions_1.getSessionEnvs();
    const requestBody = {
        "grant_type": env.granttype,
        "refresh_token": env.refreshtoken
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic ' + env.code
    };
    yield axios_1.default.post(env.sessionUrl, querystring_1.default.stringify(requestBody), { headers: headers }).then(newtoken => {
        const retrievedToken = newtoken.data;
        fs_1.default.appendFileSync('session.txt', retrievedToken.access_token
            + '\n' +
            getTokenExpirationTime(retrievedToken));
    });
});
const search = (track, page) => __awaiter(void 0, void 0, void 0, function* () {
    if (hasSessionExpired()) {
        yield CreateNewSession();
    }
    const token = getSessionToken();
    const envs = envFunctions_1.getSearchEnvs();
    const pageError = errorFunctions_1.getMessage('number', page.toString(), false);
    const offset = (parserNum(page, pageError) - 1) * 10;
    const trackError = errorFunctions_1.getMessage('string', track, true);
    const parsedTrack = parserString(track, trackError);
    const url = envs.querypart1
        + parsedTrack + envs.typepart2
        + envs.offsetpart3
        + offset.toString()
        + envs.limitpart4;
    return yield (yield axios_1.default.get(url, { headers: { 'authorization': 'Bearer ' + token } })).data;
});
const AddToList = (tracks, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (hasSessionExpired()) {
        yield CreateNewSession();
    }
    const { trackpart1, trackpart3 } = envFunctions_1.getTracktEnvs();
    const token = getSessionToken();
    let listid = '';
    const fetcheduser = yield user_1.default.getUser(userId);
    listid = fetcheduser === null || fetcheduser === void 0 ? void 0 : fetcheduser.favorites;
    if (!listid) {
        const username = fetcheduser === null || fetcheduser === void 0 ? void 0 : fetcheduser.username;
        const id = fetcheduser === null || fetcheduser === void 0 ? void 0 : fetcheduser.id;
        listid = (yield CreateList(username, id));
    }
    const url = trackpart1 + listid + trackpart3;
    const requestBody = {
        "uris": tracks
    };
    const headers = {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
    };
    yield axios_1.default.post(url, requestBody, { headers: headers });
});
const CreateList = (name, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId, playlistpart1, playlistpart3 } = envFunctions_1.getPlayListEnvs();
    if (hasSessionExpired()) {
        yield CreateNewSession();
    }
    const url = playlistpart1 + accountId + playlistpart3;
    const token = getSessionToken();
    const requestBody = {
        "name": name,
        "description": "Tracks",
        "public": false
    };
    const headers = {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
    };
    return yield axios_1.default.post(url, requestBody, { headers: headers }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        const list = response.data;
        yield user_1.default.addList(list.id, userid);
        return list.id;
    }));
});
const GetList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (hasSessionExpired()) {
        yield CreateNewSession();
    }
    const token = getSessionToken();
    const { trackpart1, trackpart3 } = envFunctions_1.getTracktEnvs();
    let listid = '';
    const fetcheduser = yield user_1.default.getUser(userId);
    listid = fetcheduser === null || fetcheduser === void 0 ? void 0 : fetcheduser.favorites;
    const url = trackpart1 + listid + trackpart3;
    return yield (yield axios_1.default.get(url, { headers: { 'authorization': 'Bearer ' + token } })).data;
});
const removeItem = (userId, tracks) => __awaiter(void 0, void 0, void 0, function* () {
    if (hasSessionExpired()) {
        yield CreateNewSession();
    }
    const token = getSessionToken();
    const { trackpart1, trackpart3 } = envFunctions_1.getTracktEnvs();
    let listid = '';
    const fetcheduser = yield user_1.default.getUser(userId);
    listid = fetcheduser === null || fetcheduser === void 0 ? void 0 : fetcheduser.favorites;
    const url = trackpart1 + listid + trackpart3;
    const requestBody = {
        "uris": tracks
    };
    const headers = {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
    };
    return yield axios_1.default.delete(url, { data: requestBody, headers: headers });
});
const delegateToken = (spotifyCode) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionUrl, redirect_uri, granttype_code, code } = envFunctions_1.getSessionEnvs();
    const requestBody = {
        "grant_type": granttype_code,
        "code": spotifyCode,
        "redirect_uri": redirect_uri
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic ' + code
    };
    return yield axios_1.default.post(sessionUrl, querystring_1.default.stringify(requestBody), { headers: headers }).then(response => {
        return response.data;
    });
});
const delegateRefreshedToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const env = envFunctions_1.getSessionEnvs();
    const requestBody = {
        "grant_type": env.granttype,
        "refresh_token": refreshToken
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic ' + env.code
    };
    return yield axios_1.default.post(env.sessionUrl, querystring_1.default.stringify(requestBody), { headers: headers }).then(newtoken => {
        return newtoken.data;
    });
});
const test = (track, page) => {
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
        case "Test_TotalUnderTen":
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
        case "Test_Total15":
            testdata = {
                "tracks": [
                    { name: 'test1', uri: 'test1uri', external_urls: { spotify: 'url1' } },
                    { name: 'test2', uri: 'test2uri', external_urls: { spotify: 'url2' } },
                    { name: 'test3', uri: 'test3uri', external_urls: { spotify: 'url3' } },
                    { name: 'test4', uri: 'test4uri', external_urls: { spotify: 'url4' } },
                    { name: 'test5', uri: 'test5uri', external_urls: { spotify: 'url5' } }
                ],
                "total": 15
            };
            break;
        case "Test_Total15_11":
            testdata = {
                "tracks": [
                    { name: 'test1', uri: 'test1uri', external_urls: { spotify: 'url1' } },
                    { name: 'test2', uri: 'test2uri', external_urls: { spotify: 'url2' } },
                    { name: 'test3', uri: 'test3uri', external_urls: { spotify: 'url3' } },
                    { name: 'test4', uri: 'test4uri', external_urls: { spotify: 'url4' } },
                    { name: 'test5', uri: 'test5uri', external_urls: { spotify: 'url5' } }
                ],
                "total": 15
            };
            break;
    }
    return testdata;
};
exports.default = {
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
