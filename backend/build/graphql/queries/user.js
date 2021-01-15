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
exports.getUser = exports.searchUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = __importDefault(require("../../services/user"));
exports.searchUser = (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
    const value = args.value;
    return yield user_1.default.search(value).then(result => {
        return result;
    }).catch((error) => {
        console.error(error.stack);
        if (error instanceof apollo_server_express_1.ApolloError) {
            throw new apollo_server_express_1.ApolloError(error.message);
        }
        else if (error instanceof apollo_server_express_1.UserInputError) {
            throw new apollo_server_express_1.UserInputError(error.message);
        }
    });
});
exports.getUser = (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
    const id = args.id;
    return yield user_1.default.getUser(id).then(result => {
        return result;
    }).catch((error) => {
        console.error(error.stack);
        if (error instanceof apollo_server_express_1.ApolloError) {
            throw new apollo_server_express_1.ApolloError(error.message);
        }
        else if (error instanceof apollo_server_express_1.UserInputError) {
            throw new apollo_server_express_1.UserInputError(error.message);
        }
    });
});
exports.default = {
    searchUser: exports.searchUser,
    getUser: exports.getUser
};
