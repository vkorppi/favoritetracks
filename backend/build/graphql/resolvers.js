"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const track_1 = __importDefault(require("../graphql/queries/track"));
const user_1 = __importDefault(require("../graphql/queries/user"));
const session_1 = __importDefault(require("../graphql/queries/session"));
const user_2 = __importDefault(require("../graphql/mutations/user"));
const session_2 = __importDefault(require("../graphql/mutations/session"));
const track_2 = __importDefault(require("../graphql/mutations/track"));
exports.resolvers = {
    Query: {
        search: track_1.default.search,
        getList: track_1.default.getList,
        searchUser: user_1.default.searchUser,
        getUser: user_1.default.getUser,
        delegateToken: session_1.default.delegateToken,
        getUserLoggedin: session_1.default.getUserLoggedin,
        delegateRefreshedToken: session_1.default.delegateRefreshedToken
    },
    Mutation: {
        create: user_2.default.create,
        updateUser: user_2.default.updateUser,
        updatePassword: user_2.default.updatePassword,
        remove: user_2.default.remove,
        login: session_2.default.login,
        addTrackToList: track_2.default.addTrackToList,
        removeItem: track_2.default.removeItem
    }
};
