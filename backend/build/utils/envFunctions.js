"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTracktEnvs = exports.getPlayListEnvs = exports.getSessionEnvs = exports.getSearchEnvs = void 0;
const typeparsers_1 = __importDefault(require("../utils/typeparsers"));
const errorFunctions_1 = require("../utils/errorFunctions");
const parser = typeparsers_1.default.parseString;
const env = process.env;
exports.getSearchEnvs = () => {
    return {
        querypart1: parser(env.QUERYPART1, errorFunctions_1.getMessage('EnvString', 'QUERYPART1', false)),
        typepart2: parser(env.TYPEPART2, errorFunctions_1.getMessage('EnvString', 'TYPEPART2', false)),
        offsetpart3: parser(env.OFFSETPART3, errorFunctions_1.getMessage('EnvString', 'OFFSETPART3', false)),
        limitpart4: parser(env.LIMITPART4, errorFunctions_1.getMessage('EnvString', 'LIMITPART4', false))
    };
};
exports.getSessionEnvs = () => {
    return {
        granttype: parser(env.GRANTTYPE, errorFunctions_1.getMessage('EnvString', 'GRANTTYPE', false)),
        refreshtoken: parser(env.REFRESHTOKEN, errorFunctions_1.getMessage('EnvString', 'REFRESHTOKEN', false)),
        sessionUrl: parser(env.SESSIONURL, errorFunctions_1.getMessage('EnvString', 'SESSIONURL', false)),
        code: parser(env.CODE, errorFunctions_1.getMessage('EnvString', 'CODE', false)),
        secret: parser(env.SECRET, errorFunctions_1.getMessage('EnvString', 'SECRET', false)),
        redirect_uri: parser(env.REDIRECT_URI, errorFunctions_1.getMessage('EnvString', 'REDIRECT_URI', false)),
        granttype_code: parser(env.GRANTTYPE_CODE, errorFunctions_1.getMessage('EnvString', 'GRANTTYPE_CODE', false))
    };
};
exports.getPlayListEnvs = () => {
    return {
        accountId: parser(env.ACCOUNTID, errorFunctions_1.getMessage('EnvString', 'ACCOUNTID', false)),
        playlistpart1: parser(env.PLAYLISTPART1, errorFunctions_1.getMessage('EnvString', 'PLAYLISTPART1', false)),
        playlistpart3: parser(env.PLAYLISTPART3, errorFunctions_1.getMessage('EnvString', 'PLAYLISTPART3', false)),
    };
};
exports.getTracktEnvs = () => {
    return {
        trackpart1: parser(env.TRACKSPART1, errorFunctions_1.getMessage('EnvString', 'TRACKSPART1', false)),
        trackpart3: parser(env.TRACKSPART3, errorFunctions_1.getMessage('EnvString', 'TRACKSPART3', false))
    };
};
