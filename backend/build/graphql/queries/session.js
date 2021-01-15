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
exports.delegateRefreshedToken = exports.getUserLoggedin = exports.delegateToken = void 0;
const user_1 = __importDefault(require("../../services/user"));
const spotify_1 = __importDefault(require("../../services/spotify"));
const apollo_server_express_1 = require("apollo-server-express");
exports.delegateToken = (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
    const code = args.code;
    const playlist = args.playlist;
    yield user_1.default.addPLaylist(playlist, userdata.id);
    return yield spotify_1.default.delegateToken(code).then(result => {
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
exports.getUserLoggedin = (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
    if (args)
        null;
    return yield user_1.default.getUser(userdata.id);
});
exports.delegateRefreshedToken = (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshedToken = args.refreshedToken;
    return yield spotify_1.default.delegateRefreshedToken(refreshedToken).then(result => {
        console.log(result);
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
    delegateRefreshedToken: exports.delegateRefreshedToken,
    getUserLoggedin: exports.getUserLoggedin,
    delegateToken: exports.delegateToken
};
