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
exports.getList = exports.search = void 0;
const spotify_1 = __importDefault(require("../../services/spotify"));
const apollo_server_express_1 = require("apollo-server-express");
exports.search = (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.getList = (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
    if (args)
        null;
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
});
exports.default = {
    search: exports.search,
    getList: exports.getList
};
