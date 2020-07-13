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
const spotify_1 = __importDefault(require("../services/spotify"));
const user_1 = __importDefault(require("../services/user"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const typeparsers_1 = __importDefault(require("../utils/typeparsers"));
const user_2 = __importDefault(require("../mongo/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const userFunctions_1 = require("../utils/userFunctions");
dotenv_1.default.config();
describe('Testing spotify services', () => {
    test('creates session file with expirationtime and token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield spotify_1.default.CreateNewSession();
        const fileExists = fs_1.default.existsSync('session.txt');
        let filecontent = [];
        if (fileExists) {
            filecontent = fs_1.default.readFileSync('session.txt', 'utf8').toString().split("\n");
        }
        expect(fileExists).toBe(true);
        expect(filecontent.length).toBe(2);
    }));
    test('Removes existing file and creates new file with the same name', () => __awaiter(void 0, void 0, void 0, function* () {
        let filecontent = '';
        fs_1.default.appendFileSync('session.txt', 'test');
        yield spotify_1.default.CreateNewSession();
        filecontent = fs_1.default.readFileSync('session.txt', 'utf8').toString();
        expect(!filecontent.includes('test')).toBe(true);
    }));
    test('If session has not expired returns false', () => {
        if (fs_1.default.existsSync('session.txt')) {
            fs_1.default.unlinkSync('session.txt');
        }
        const milliseconds = 1000 * 60 * 60;
        let dateExpire = new Date();
        const date = new Date();
        dateExpire = new Date(date.getTime() + milliseconds);
        fs_1.default.appendFileSync('session.txt', 'token' + '\n' + dateExpire.getTime().toString());
        expect(spotify_1.default.hasSessionExpired()).toBe(false);
    });
    test('If session has expired returns true', () => {
        if (fs_1.default.existsSync('session.txt')) {
            fs_1.default.unlinkSync('session.txt');
        }
        const milliseconds = 1000 * 60 * 60;
        let dateExpire = new Date();
        const date = new Date();
        dateExpire = new Date(date.getTime() - milliseconds);
        fs_1.default.appendFileSync('session.txt', 'token' + '\n' + dateExpire.getTime().toString());
        expect(spotify_1.default.hasSessionExpired()).toBe(true);
    });
});
describe('Testing usermanagement services', () => {
    const parser = typeparsers_1.default.parseString;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const env = process.env;
        const error = 'databseurl url was not as string';
        const configuration = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
        yield mongoose_1.default.connect(parser(env.DBTEST, error), configuration);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_2.default.deleteMany({});
        const testuser = {
            username: 'usernameTest',
            password: userFunctions_1.hashPassword('passwordTest'),
            firstname: 'firstnameTest',
            lastname: 'lastnameTest'
        };
        const userTest = new user_2.default(testuser);
        yield userTest.save();
        const testuser2 = {
            username: 'username2daTest',
            password: userFunctions_1.hashPassword('passworqedTest'),
            firstname: 'firstqwenameTest',
            lastname: 'lastnameTest'
        };
        const userTest2 = new user_2.default(testuser2);
        yield userTest2.save();
    }));
    test('User is created to database', () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.create('username4', 'password', 'firstname', 'lastname', '11.11.1999', 'test.test@mail.com', 'road 12');
        const newuser = yield user_2.default.findOne({ username: 'username4' });
        const password = parser(newuser === null || newuser === void 0 ? void 0 : newuser.password, 'password was empty');
        const success = yield bcryptjs_1.default.compare('password', password);
        expect(newuser === null || newuser === void 0 ? void 0 : newuser.username).toBe('username4');
        expect(success).toBe(true);
        expect(newuser === null || newuser === void 0 ? void 0 : newuser.firstname).toBe('firstname');
        expect(newuser === null || newuser === void 0 ? void 0 : newuser.lastname).toBe('lastname');
        expect(newuser === null || newuser === void 0 ? void 0 : newuser.birthdate).toBe('11.11.1999');
        expect(newuser === null || newuser === void 0 ? void 0 : newuser.email).toBe('test.test@mail.com');
        expect(newuser === null || newuser === void 0 ? void 0 : newuser.address).toBe('road 12');
    }));
    test('Password is updated', () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser = yield user_2.default.findOne({ username: 'usernameTest' });
        yield user_1.default.updatePassword('newpassword', fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id);
        const userNewPass = yield user_2.default.findOne({ username: 'usernameTest' });
        const password = parser(userNewPass === null || userNewPass === void 0 ? void 0 : userNewPass.password, 'password was empty');
        const success = yield bcryptjs_1.default.compare('newpassword', password);
        expect(success).toBe(true);
    }));
    test('User is updated', () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser = yield user_2.default.findOne({ username: 'usernameTest' });
        yield user_1.default.update('Newfirstname', 'Newlastname', '12.12.2000', 'new.new@mail.com', 'address 123', fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id);
        const userNameChanged = yield user_2.default.findOne({ username: 'usernameTest' });
        expect(userNameChanged === null || userNameChanged === void 0 ? void 0 : userNameChanged.firstname).toBe('Newfirstname');
        expect(userNameChanged === null || userNameChanged === void 0 ? void 0 : userNameChanged.lastname).toBe('Newlastname');
        expect(userNameChanged === null || userNameChanged === void 0 ? void 0 : userNameChanged.birthdate).toBe('12.12.2000');
        expect(userNameChanged === null || userNameChanged === void 0 ? void 0 : userNameChanged.email).toBe('new.new@mail.com');
        expect(userNameChanged === null || userNameChanged === void 0 ? void 0 : userNameChanged.address).toBe('address 123');
    }));
    test('User can be searched', () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser1 = yield user_1.default.search('firstnameTest');
        const fetchedUser2 = yield user_1.default.search('lastnameTest');
        const fetchedUser3 = yield user_1.default.search('usernameTest');
        expect(fetchedUser1).toBeTruthy();
        expect(fetchedUser2.length).toBe(2);
        expect(fetchedUser3).toBeTruthy();
    }));
    test('User gets token when login is succesfull', () => __awaiter(void 0, void 0, void 0, function* () {
        const parser = typeparsers_1.default.parseString;
        const env = process.env;
        const secretError = 'was not a string';
        const fetchedUser = yield user_2.default.findOne({ username: 'usernameTest' });
        const encodedtoken = yield user_1.default.login('usernameTest', 'passwordTest');
        const decodedtoken = jsonwebtoken_1.verify(encodedtoken.value, parser(env.SECRET, secretError));
        const jsonToken = decodedtoken;
        expect(jsonToken.id === (fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id)).toBe(true);
        expect(jsonToken.username === (fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.username)).toBe(true);
    }));
    test('User is deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser = yield user_2.default.findOne({ username: 'usernameTest' });
        yield user_1.default.remove(fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id);
        const userNotFound = yield user_2.default.findOne({ username: 'usernameTest' });
        expect(userNotFound).toBe(null);
    }));
    test('User can be found with id', () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser = yield user_2.default.findOne({ username: 'usernameTest' });
        const userFound = yield user_1.default.getUser(fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id);
        expect(userFound).toBeTruthy();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_2.default.deleteMany({});
        void mongoose_1.default.connection.close();
        console.log('Database connection closed');
    }));
});
describe('Testing services that use database and spotify', () => {
    const parser = typeparsers_1.default.parseString;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const env = process.env;
        const error = 'databseurl url was not as string';
        const configuration = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
        yield mongoose_1.default.connect(parser(env.DBTEST, error), configuration);
        yield user_2.default.deleteMany({});
        const testuser = {
            username: 'user919',
            password: userFunctions_1.hashPassword('passwordTest'),
            firstname: 'firstnameTest',
            lastname: 'lastnameTest'
        };
        const userTest = new user_2.default(testuser);
        yield userTest.save();
    }));
    test("service updates user's favorites with created trackslist", () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser = yield user_2.default.findOne({ username: 'user919' });
        yield spotify_1.default.CreateList('user919', fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id);
        const fetchedUser2 = yield user_2.default.findOne({ username: 'user919' });
        expect(fetchedUser2 === null || fetchedUser2 === void 0 ? void 0 : fetchedUser2.favorites).toBeTruthy();
    }));
    test("service adds tracks to user's list and does not fail", () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser = yield user_2.default.findOne({ username: 'user919' });
        yield spotify_1.default.AddToList([
            'spotify:track:59LSFQW38CnzJylvtYJKJu',
            'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
        ], fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id);
        const fetchedUser2 = yield user_2.default.findOne({ username: 'user919' });
        expect(fetchedUser2 === null || fetchedUser2 === void 0 ? void 0 : fetchedUser2.favorites).toBeTruthy();
    }));
    test("Added tracks can be fetched from spotify", () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser = yield user_2.default.findOne({ username: 'user919' });
        const id = fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id;
        const list = yield spotify_1.default.GetList(id);
        expect(list.items.length).toBe(2);
    }));
    test("service removes added tracks", () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchedUser = yield user_2.default.findOne({ username: 'user919' });
        const id = fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.id;
        yield spotify_1.default.removeItem(id, [
            'spotify:track:59LSFQW38CnzJylvtYJKJu',
            'spotify:track:6sXK5j92V7XpaIUH2w5GRb'
        ]);
        const list = yield spotify_1.default.GetList(id);
        expect(list.items.length).toBe(0);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_2.default.deleteMany({});
        void mongoose_1.default.connection.close();
        console.log('Database connection closed');
    }));
});
