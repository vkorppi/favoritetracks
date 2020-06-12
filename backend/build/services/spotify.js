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
dotenv_1.default.config();
const hasSessionExpired = () => {
    try {
        if (!fs_1.default.existsSync('session.txt')) {
            return true;
        }
        const filecontent = fs_1.default.readFileSync('session.txt', 'utf8').toString().split("\n");
        const expiration = typeparsers_1.default.parseExpiration(filecontent[1]);
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
// metodi try catchen sisaan
const CreateNewSession = () => __awaiter(void 0, void 0, void 0, function* () {
    const granttype = typeparsers_1.default.parseEnvString(process.env.GRANTTYPE);
    const refreshtoken = typeparsers_1.default.parseEnvString(process.env.REFRESHTOKEN);
    const sessionUrl = typeparsers_1.default.parseEnvString(process.env.SESSIONURL);
    const code = typeparsers_1.default.parseEnvString(process.env.CODE);
    if (fs_1.default.existsSync('session.txt')) {
        fs_1.default.unlinkSync('session.txt');
    }
    const requestBody = {
        "grant_type": granttype,
        "refresh_token": refreshtoken
    };
    yield axios_1.default.post(sessionUrl, querystring_1.default.stringify(requestBody), { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'authorization': 'Basic ' + code } }).then(newtoken => {
        const retrievedToken = newtoken.data;
        const milliseconds = typeparsers_1.default.parseExpiration(retrievedToken.expires_in) * 1000;
        const current = new Date();
        const expirationTime = new Date(current.getTime() + milliseconds);
        fs_1.default.appendFileSync('session.txt', retrievedToken.access_token + '\n' + expirationTime.getTime().toString());
    });
});
const search = (track, page) => __awaiter(void 0, void 0, void 0, function* () {
    if (hasSessionExpired()) {
        yield CreateNewSession();
    }
    const filecontent = fs_1.default.readFileSync('session.txt', 'utf8').toString().split("\n");
    const token = typeparsers_1.default.parseToken(filecontent[0]);
    const querypart1 = typeparsers_1.default.parseEnvString(process.env.QUERYPART1);
    const typepart2 = typeparsers_1.default.parseEnvString(process.env.TYPEPART2);
    const offsetpart3 = typeparsers_1.default.parseEnvString(process.env.OFFSETPART3);
    const limitpart4 = typeparsers_1.default.parseEnvString(process.env.LIMITPART4);
    const offset = page * 10;
    const url = querypart1 + track + typepart2 + offsetpart3 + offset.toString() + limitpart4;
    return yield (yield axios_1.default.get(url, { headers: { 'authorization': 'Bearer ' + token } })).data;
});
exports.default = {
    hasSessionExpired,
    CreateNewSession,
    search
};
