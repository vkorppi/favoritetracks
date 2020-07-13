"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeguards_1 = __importDefault(require("../utils/typeguards"));
const typeparsers_1 = __importDefault(require("../utils/typeparsers"));
const errorFunctions_1 = require("../utils/errorFunctions");
const testFunctions_1 = require("../utils/testFunctions");
describe('Testing typeguards', () => {
    test('Returns true when number when number is checked', () => {
        expect(typeguards_1.default.isNumber('test')).toBe(false);
        expect(typeguards_1.default.isNumber(123)).toBe(true);
    });
    test('Returns false when value is not a string else returns true', () => {
        expect(typeguards_1.default.isString(123)).toBe(false);
        expect(typeguards_1.default.isString('test')).toBe(true);
    });
    test('Returns false if date does not follow format: day.month.year', () => {
        expect(typeguards_1.default.isDate('11.11.1990')).toBe(true);
        expect(typeguards_1.default.isDate('11-11-1990')).toBe(false);
        expect(typeguards_1.default.isDate('1990.11.24')).toBe(false);
    });
});
describe('Testing typeparsers', () => {
    test('Stringparser throws exception for non string values', () => {
        const parser = typeparsers_1.default.parseString;
        const errormessage1 = errorFunctions_1.getMessage('string', '', false);
        const errormessage2 = errorFunctions_1.getMessage('string', String(123), false);
        const errormessage3 = errorFunctions_1.getMessage('string', 'test', false);
        const result1 = testFunctions_1.testParserString('', errormessage1, parser);
        const result2 = testFunctions_1.testParserString(123, errormessage2, parser);
        const result3 = testFunctions_1.testParserString('test', errormessage3, parser);
        expect(result1).toBe(errormessage1);
        expect(result2).toBe(errormessage2);
        expect(result3).toBe('');
    });
    test('Numberparser throws exception for non number values', () => {
        const errormessage1 = errorFunctions_1.getMessage('number', '', false);
        const errormessage2 = errorFunctions_1.getMessage('number', String(123), false);
        const errormessage3 = errorFunctions_1.getMessage('number', 'test', false);
        const result1 = testFunctions_1.testParserNumber('', errormessage1, typeparsers_1.default.parseNumber);
        const result2 = testFunctions_1.testParserNumber(123, errormessage2, typeparsers_1.default.parseNumber);
        const result3 = testFunctions_1.testParserNumber('test', errormessage3, typeparsers_1.default.parseNumber);
        expect(result1).toBe(errormessage1);
        expect(result2).toBe('');
        expect(result3).toBe(errormessage3);
    });
    test('parseStringUserInput throws exception for non string values', () => {
        const errormessage1 = errorFunctions_1.getMessage('string', '', false);
        const errormessage2 = errorFunctions_1.getMessage('string', String(123), false);
        const errormessage3 = errorFunctions_1.getMessage('string', 'test', false);
        const result1 = testFunctions_1.testParserString('', errormessage1, typeparsers_1.default.parseStringUserInput);
        const result2 = testFunctions_1.testParserString(123, errormessage2, typeparsers_1.default.parseStringUserInput);
        const result3 = testFunctions_1.testParserString('test', errormessage3, typeparsers_1.default.parseStringUserInput);
        expect(result1).toBe(errormessage1);
        expect(result2).toBe(errormessage2);
        expect(result3).toBe('');
    });
    test('parseNumberUserInput throws exception for non string values', () => {
        const errormessage1 = errorFunctions_1.getMessage('number', '', false);
        const errormessage2 = errorFunctions_1.getMessage('number', String(123), false);
        const errormessage3 = errorFunctions_1.getMessage('number', 'test', false);
        const result1 = testFunctions_1.testParserNumber('', errormessage1, typeparsers_1.default.parseNumberUserInput);
        const result2 = testFunctions_1.testParserNumber(123, errormessage2, typeparsers_1.default.parseNumberUserInput);
        const result3 = testFunctions_1.testParserNumber('test', errormessage3, typeparsers_1.default.parseNumberUserInput);
        expect(result1).toBe(errormessage1);
        expect(result2).toBe('');
        expect(result3).toBe(errormessage3);
    });
});
