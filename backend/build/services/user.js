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
exports.updatePassword = exports.create = void 0;
const typeparsers_1 = __importDefault(require("../utils/typeparsers"));
const user_1 = __importDefault(require("../mongo/user"));
const userFunctions_1 = require("../utils/userFunctions");
const jsonwebtoken_1 = require("jsonwebtoken");
const apollo_server_express_1 = require("apollo-server-express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const parser = typeparsers_1.default.parseString;
const emailParser = typeparsers_1.default.parseEmailUserInput;
const dateParser = typeparsers_1.default.parseBirthdate;
const errorFunctions_1 = require("../utils/errorFunctions");
const envFunctions_1 = require("../utils/envFunctions");
const firstnameError = errorFunctions_1.getMessage('string', 'firstname', true);
const lastnameError = errorFunctions_1.getMessage('string', 'lastname', true);
const birthdateError = errorFunctions_1.getMessage('format', 'birthdate', true);
const emailError = errorFunctions_1.getMessage('format', 'email', true);
const addressError = errorFunctions_1.getMessage('string', 'address', true);
exports.create = (username, password, firstname, lastname, birthdate, email, address) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedUser = yield user_1.default.findOne({ username: username });
    const usernameError = errorFunctions_1.getMessage('string', 'username', true);
    if (fetchedUser) {
        throw new apollo_server_express_1.UserInputError('userInput: username was reserverd ');
    }
    const userInput = {
        username: parser(username, usernameError),
        password: userFunctions_1.hashPassword(password),
        firstname: parser(firstname, firstnameError),
        lastname: parser(lastname, lastnameError),
        birthdate: birthdate ? dateParser(birthdate, birthdateError) : '',
        email: email ? emailParser(email, emailError) : '',
        address: address ? parser(address, addressError) : '',
        admin: false
    };
    const user = new user_1.default(userInput);
    return yield user.save();
});
const addList = (favorites, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.updateOne({ _id: id }, {
        $set: {
            "favorites": parser(favorites, errorFunctions_1.getMessage('string', 'favorites', false))
        }
    });
    return id;
});
const update = (firstname, lastname, birthdate, email, address, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.updateOne({ _id: id }, {
        $set: {
            "firstname": parser(firstname, firstnameError),
            "lastname": parser(lastname, lastnameError),
            "birthdate": birthdate ? dateParser(birthdate, birthdateError) : '',
            "email": email ? emailParser(email, emailError) : '',
            "address": address ? parser(address, addressError) : ''
        }
    });
});
exports.updatePassword = (password, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.updateOne({ _id: id }, {
        $set: {
            "password": userFunctions_1.hashPassword(password)
        }
    });
});
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteOne({ _id: id });
});
const search = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const searchCriteria = {
        $or: [
            { firstname: { $regex: '.*' + value + '.*' } },
            { lastname: { $regex: '.*' + value + '.*' } },
            { username: { $regex: '.*' + value + '.*' } }
        ]
    };
    const users = yield user_1.default.find(searchCriteria);
    if (!users) {
        throw new apollo_server_express_1.UserInputError('userInput: Search did not return any results');
    }
    return users;
});
const isAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: id });
    return user.admin;
});
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { secret } = envFunctions_1.getSessionEnvs();
    const id = yield check(parser(username, errorFunctions_1.getMessage('string', 'username', true)), parser(password, "userInput: password was invalid"));
    const hasAdminrole = yield isAdmin(id);
    return { value: jsonwebtoken_1.sign({ username: username, id: id }, secret), admin: hasAdminrole };
});
const check = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ username: username });
    if (!user) {
        throw new apollo_server_express_1.UserInputError('userInput: Username did match any users');
    }
    else {
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new apollo_server_express_1.UserInputError('userInput: Password was incorrect');
        }
    }
    return user.id;
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({ _id: id });
});
const addPLaylist = (playlist, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.updateOne({ _id: id }, {
        $set: {
            "playlist": parser(playlist, errorFunctions_1.getMessage('string', 'playlist', false))
        }
    });
    return id;
});
exports.default = {
    create: exports.create,
    updatePassword: exports.updatePassword,
    update,
    remove,
    search,
    check,
    login,
    getUser,
    addList,
    addPLaylist,
    isAdmin
};
