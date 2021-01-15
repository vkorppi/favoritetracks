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
exports.remove = exports.updatePassword = exports.updateUser = exports.create = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = __importDefault(require("../../services/user"));
const mongodb_1 = require("mongodb");
exports.create = (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
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
    return yield user_1.default.create(username, password, firstname, lastname, birthdate, email, address).then(() => {
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
});
exports.updateUser = (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
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
    return yield user_1.default.update(firstname, lastname, birthdate, email, address, id).then(() => {
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
});
exports.updatePassword = (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
    const password = args.password;
    const id = args.id;
    return yield user_1.default.updatePassword(password, id).then(() => {
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
});
exports.remove = (_root, args, userdata) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedUser = yield user_1.default.getUser(userdata.id);
    if (!loggedUser) {
        throw new apollo_server_express_1.ForbiddenError("Unauthorized action");
    }
    if (!loggedUser.admin) {
        throw new apollo_server_express_1.ForbiddenError("Unauthorized action");
    }
    const id = args.id;
    return yield user_1.default.remove(id).then(() => {
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
});
exports.default = {
    create: exports.create,
    updateUser: exports.updateUser,
    updatePassword: exports.updatePassword,
    remove: exports.remove
};
