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
exports.resolvers = void 0;
const user_1 = __importDefault(require("../services/user"));
const spotify_1 = __importDefault(require("../services/spotify"));
const apollo_server_express_1 = require("apollo-server-express");
const mongodb_1 = require("mongodb");
exports.resolvers = {
    Query: {
        search: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const track = args.track;
            const page = args.page;
            let tracks = null;
            let total;
            return track.includes('Test_') ? spotify_1.default.test(track, page) :
                yield spotify_1.default.search(track, page).then(result => {
                    tracks = result.tracks.items;
                    total = result.tracks.total;
                    return { tracks: tracks, total: total };
                }).catch((error) => {
                    console.error(error.stack);
                    if (error instanceof apollo_server_express_1.ApolloError) {
                        throw new apollo_server_express_1.ApolloError(error.message);
                    }
                    else if (error instanceof apollo_server_express_1.UserInputError) {
                        throw new apollo_server_express_1.UserInputError(error.message);
                    }
                });
        }),
        searchUser: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        getUser: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        getList: (_root, _args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
            if (!userdata || !userdata.id) {
                return null;
            }
            return yield spotify_1.default.GetList(userdata.id).then(result => {
                return result.items.map(value => ({
                    name: value.track.name,
                    uri: value.track.uri,
                    external_urls: value.track.external_urls
                }));
            }).catch((error) => {
                console.error(error.stack);
                if (error instanceof apollo_server_express_1.ApolloError) {
                    throw new apollo_server_express_1.ApolloError(error.message);
                }
                else if (error instanceof apollo_server_express_1.UserInputError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
            });
        }),
        delegateToken: (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        getUserLoggedin: (_root, _args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
            return yield user_1.default.getUser(userdata.id);
        }),
        delegateRefreshedToken: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
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
        })
    },
    Mutation: {
        create: (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
            const loggedUser = yield user_1.default.getUser(userdata.id);
            if (!loggedUser) {
                throw new apollo_server_express_1.ForbiddenError("Unauthorized action");
            }
            if (!loggedUser.admin) {
                throw new apollo_server_express_1.ForbiddenError("Unauthorized action");
            }
            const firstname = args.firstname;
            const lastname = args.lastname;
            const username = args.username;
            const password = args.password;
            const email = args.email;
            const address = args.address;
            const birthdate = args.birthdate;
            return yield user_1.default.create(username, password, firstname, lastname, birthdate, email, address).then(_result => {
                return `User was created with following data: username: ${username}, firstname: ${firstname}, lastname:  ${lastname} ` +
                    `birthdate: ${birthdate} email: ${email} address: ${address}`;
            }).catch((error) => {
                console.error(error.stack);
                if (error instanceof apollo_server_express_1.ApolloError) {
                    throw new apollo_server_express_1.ApolloError(error.message);
                }
                else if (error instanceof apollo_server_express_1.UserInputError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
                else if (error instanceof mongodb_1.MongoError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
            });
        }),
        updateUser: (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
            const firstname = args.firstname;
            const lastname = args.lastname;
            const id = args.id;
            const birthdate = args.birthdate;
            const email = args.email;
            const address = args.address;
            const loggedUser = yield user_1.default.getUser(userdata.id);
            if (!loggedUser) {
                throw new apollo_server_express_1.ForbiddenError("Unauthorized action");
            }
            if (!loggedUser.admin && id !== loggedUser.id) {
                throw new apollo_server_express_1.ForbiddenError("Unauthorized action");
            }
            return yield user_1.default.update(firstname, lastname, birthdate, email, address, id).then(_result => {
                return `User was updated with following data: firstname: ${firstname}, lastname:  ${lastname} ` +
                    `birthdate: ${birthdate} email: ${email} address: ${address}`;
            }).catch((error) => {
                console.error(error.stack);
                if (error instanceof apollo_server_express_1.UserInputError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
                else if (error instanceof apollo_server_express_1.ApolloError) {
                    throw new apollo_server_express_1.ApolloError(error.message);
                }
                else if (error instanceof mongodb_1.MongoError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
            });
        }),
        updatePassword: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const password = args.password;
            const id = args.id;
            return yield user_1.default.updatePassword(password, id).then(_result => {
                return `User's password was updated. User's id was ${id}`;
            }).catch((error) => {
                console.error(error.stack);
                if (error instanceof apollo_server_express_1.ApolloError) {
                    throw new apollo_server_express_1.ApolloError(error.message);
                }
                else if (error instanceof apollo_server_express_1.UserInputError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
                else if (error instanceof mongodb_1.MongoError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
            });
        }),
        remove: (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
            const loggedUser = yield user_1.default.getUser(userdata.id);
            if (!loggedUser) {
                throw new apollo_server_express_1.ForbiddenError("Unauthorized action");
            }
            if (!loggedUser.admin) {
                throw new apollo_server_express_1.ForbiddenError("Unauthorized action");
            }
            const id = args.id;
            return yield user_1.default.remove(id).then(_result => {
                return `User with id: ${id} was removed`;
            }).catch((error) => {
                console.error(error.stack);
                if (error instanceof apollo_server_express_1.ApolloError) {
                    throw new apollo_server_express_1.ApolloError(error.message);
                }
                else if (error instanceof apollo_server_express_1.UserInputError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
            });
        }),
        login: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const username = args.username;
            const password = args.password;
            return yield user_1.default.login(username, password).then(result => {
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
        }),
        addTrackToList: (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
            const tracks = args.tracks;
            yield spotify_1.default.AddToList(tracks, userdata.id).catch((error) => {
                console.error(error.stack);
                if (error instanceof apollo_server_express_1.ApolloError) {
                    throw new apollo_server_express_1.ApolloError(error.message);
                }
                else if (error instanceof apollo_server_express_1.UserInputError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
            });
            return `Tracks: ${tracks.toString()} was added succesfully`;
        }),
        removeItem: (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
            const tracks = args.tracks;
            yield spotify_1.default.removeItem(userdata.id, tracks).catch((error) => {
                console.error(error.stack);
                if (error instanceof apollo_server_express_1.ApolloError) {
                    throw new apollo_server_express_1.ApolloError(error.message);
                }
                else if (error instanceof apollo_server_express_1.UserInputError) {
                    throw new apollo_server_express_1.UserInputError(error.message);
                }
            });
            return `Tracks: ${tracks.toString()} was removed succesfully`;
        })
    }
};
