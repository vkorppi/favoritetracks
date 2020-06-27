

import typeguards from '../utils/typeguards';
import typeparsers from '../utils/typeparsers';
import { getMessage } from '../utils/errorFunctions';

import { testParserString, testParserNumber } from '../utils/testFunctions';

describe('Testing typeguards', () => {


    test('Returns true when number when number is checked', () => {

        expect(typeguards.isNumber('test')).toBe(false);
        expect(typeguards.isNumber(123)).toBe(true);

    });

    test('Returns false when value is not a string else returns true', () => {

        expect(typeguards.isString(123)).toBe(false);
        expect(typeguards.isString('test')).toBe(true);
    });


    test('Returns false if date does not follow format: day.month.year', () => {

        expect(typeguards.isDate('11.11.1990')).toBe(true);
        expect(typeguards.isDate('11-11-1990')).toBe(false);
        expect(typeguards.isDate('1990.11.24')).toBe(false);
    });

});

describe('Testing typeparsers', () => {

    const errorString = 'variable was not a string';
    const errorNumber = 'variable was not a number';

    const errorUserInputNumber = 'input was not a number';
    const errorUserInputString = 'input was not a string';

    test('Stringparser throws exception for non string values', () => {

        const transformer = new Number(10);
        const parser = typeparsers.parseString;
        const wrongValue = transformer.toString(5);

        const errormessage1 = getMessage('string', '');
        const errormessage2 = getMessage('string', wrongValue);
        const errormessage3 = getMessage('string', 'test');
        
        const result1 = testParserString('', errormessage1, parser);
        const result2 = testParserString(123, errormessage2, parser);
        const result3 = testParserString('test', errormessage3, parser);

        expect(result1).toBe(errormessage1);
        expect(result2).toBe(errormessage2);
        expect(result3).toBe('');

    });

    test('Numberparser throws exception for non number values', () => {

        const result1 = testParserNumber('', errorNumber, typeparsers.parseNumber);
        const result2 = testParserNumber(123, errorNumber, typeparsers.parseNumber);
        const result3 = testParserNumber('test', errorNumber, typeparsers.parseNumber);

        expect(result1).toBe(errorNumber);
        expect(result2).toBe('');
        expect(result3).toBe(errorNumber);

    });


    test('parseStringUserInput throws exception for non string values', () => {

        const result1 = testParserString('', errorUserInputString, typeparsers.parseStringUserInput);
        const result2 = testParserString(123, errorUserInputString, typeparsers.parseStringUserInput);
        const result3 = testParserString('test', errorUserInputString, typeparsers.parseStringUserInput);

        expect(result1).toBe(errorUserInputString);
        expect(result2).toBe(errorUserInputString);
        expect(result3).toBe('');

    });

    test('parseNumberUserInput throws exception for non string values', () => {

        const result1 = testParserNumber('', errorUserInputNumber, typeparsers.parseNumberUserInput);
        const result2 = testParserNumber(123, errorUserInputNumber, typeparsers.parseNumberUserInput);
        const result3 = testParserNumber('test', errorUserInputNumber, typeparsers.parseNumberUserInput);

        expect(result1).toBe(errorUserInputNumber);
        expect(result2).toBe('');
        expect(result3).toBe(errorUserInputNumber);

    });

});