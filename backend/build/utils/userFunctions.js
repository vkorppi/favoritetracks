"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeparsers_1 = __importDefault(require("../utils/typeparsers"));
const passwordError = 'userInput: password: password was not a string';
exports.hashPassword = (password) => {
    const parse = typeparsers_1.default.parseString;
    return bcryptjs_1.default.hashSync(parse(password, passwordError), 10);
};
