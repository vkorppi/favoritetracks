

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

    test('Stringparser throws exception for non string values', () => {

        
        const parser = typeparsers.parseString;

        const errormessage1 = getMessage('string', '');
        const errormessage2 = getMessage('string', String(123));
        const errormessage3 = getMessage('string', 'test');
        
        const result1 = testParserString('', errormessage1, parser);
        const result2 = testParserString(123, errormessage2, parser);
        const result3 = testParserString('test', errormessage3, parser);

        expect(result1).toBe(errormessage1);
        expect(result2).toBe(errormessage2);
        expect(result3).toBe('');

    });

    test('Numberparser throws exception for non number values', () => {

        const parser = typeparsers.parseNumber;

        const errormessage1 = getMessage('number', '');
        const errormessage2 = getMessage('number', String(123));
        const errormessage3 = getMessage('number', 'test');

        const result1 = testParserNumber('', errormessage1, typeparsers.parseNumber);
        const result2 = testParserNumber(123, errormessage2, typeparsers.parseNumber);
        const result3 = testParserNumber('test', errormessage3, typeparsers.parseNumber);

        expect(result1).toBe(errormessage1);
        expect(result2).toBe('');
        expect(result3).toBe(errormessage3);

    });


    test('parseStringUserInput throws exception for non string values', () => {

        
        const errormessage1 = getMessage('string', '');
        const errormessage2 = getMessage('string', String(123));
        const errormessage3 = getMessage('string', 'test');

        const result1 = testParserString('', errormessage1, typeparsers.parseStringUserInput);
        const result2 = testParserString(123, errormessage2, typeparsers.parseStringUserInput);
        const result3 = testParserString('test', errormessage3, typeparsers.parseStringUserInput);

        expect(result1).toBe(errormessage1);
        expect(result2).toBe(errormessage2);
        expect(result3).toBe('');

    });

    test('parseNumberUserInput throws exception for non string values', () => {

        const errormessage1 = getMessage('number', '');
        const errormessage2 = getMessage('number', String(123));
        const errormessage3 = getMessage('number', 'test');

        const result1 = testParserNumber('', errormessage1, typeparsers.parseNumberUserInput);
        const result2 = testParserNumber(123, errormessage2, typeparsers.parseNumberUserInput);
        const result3 = testParserNumber('test', errormessage3, typeparsers.parseNumberUserInput);

        expect(result1).toBe(errormessage1);
        expect(result2).toBe('');
        expect(result3).toBe(errormessage3);

    });

});