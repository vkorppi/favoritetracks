"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeguards_1 = __importDefault(require("../utils/typeguards"));
const parseExpiration = (value) => {
    if (!typeguards_1.default.isNumber(value)) {
        throw new Error('Expiration time was not a number');
    }
    return value;
};
const parseEnvString = (value) => {
    if (!typeguards_1.default.isString(value)) {
        throw new Error('Enviromentvariable was not a string');
    }
    return value;
};
const parseToken = (value) => {
    if (!typeguards_1.default.isString(value)) {
        throw new Error('token was not a string');
    }
    return value;
};
exports.default = {
    parseExpiration,
    parseEnvString,
    parseToken
};
