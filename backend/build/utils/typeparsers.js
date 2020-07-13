"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeguards_1 = __importDefault(require("../utils/typeguards"));
const apollo_server_express_1 = require("apollo-server-express");
const parseString = (value, error) => {
    if (!value || !typeguards_1.default.isString(value) || typeguards_1.default.isNumber(value)) {
        throw new apollo_server_express_1.ApolloError(error);
    }
    return value;
};
const parseNumber = (value, error) => {
    if (!value || !typeguards_1.default.isNumber(value)) {
        throw new apollo_server_express_1.ApolloError(error);
    }
    return value;
};
const parseStringUserInput = (value, error) => {
    if (!value || !typeguards_1.default.isString(value)) {
        throw new apollo_server_express_1.UserInputError(error);
    }
    return value;
};
const parseNumberUserInput = (value, error) => {
    if (!value || !typeguards_1.default.isNumber(value)) {
        throw new apollo_server_express_1.UserInputError(error);
    }
    return value;
};
const parseEmailUserInput = (value, error) => {
    if (!value || !typeguards_1.default.isString(value) || !typeguards_1.default.isEmail(value)) {
        throw new apollo_server_express_1.UserInputError(error);
    }
    return value;
};
const parseBirthdate = (value, error) => {
    console.debug(typeguards_1.default.isDate(value));
    if (!value || !typeguards_1.default.isString(value) || !typeguards_1.default.isDate(value)) {
        throw new apollo_server_express_1.UserInputError(error);
    }
    return value;
};
exports.default = {
    parseString,
    parseNumber,
    parseStringUserInput,
    parseNumberUserInput,
    parseEmailUserInput,
    parseBirthdate
};
