

import typeguards from '../utils/typeguards';
import typeparsers from '../utils/typeparsers';

describe('Testing typeguards', () => {

    test('If value is not number then return false', () => {

        expect(typeguards.isNumber('test')).toBe(false);

    });

    test('If value is number then return true', () => {

        expect(typeguards.isNumber(123)).toBe(true);

    });

    test('If value is not string then return false', () => {

        expect(typeguards.isString(123)).toBe(false);

    });

    test('If value is string then return true', () => {

        expect(typeguards.isString('test')).toBe(true);

    });

});

describe('Testing typeparsers', () => {

    const errorString = 'variable was not a string';
    const errorNumber = 'variable was not a number';
    const errorUserInputString ='input was not a string';
    const errorUserInputNumber ='input was not a number';

    test('If parameter was empty throw exception', () => {

        let message = '';

        try {
            typeparsers.parseString('', errorString);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;

        }
        expect(message).toBe(errorString);

    });

    test('If parameter was not a string throw exception', () => {

        let message = '';

        try {
            typeparsers.parseString(123, errorString);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe(errorString);
    });

    test('If parameter was a string do not throw exception', () => {

        let message = '';

        try {
            typeparsers.parseString('test', errorString);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe('');
    });

    test('If parameter was empty throw exception', () => {

        let message = '';

        try {
            typeparsers.parseNumber('', errorNumber);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;

        }
        expect(message).toBe(errorNumber);

    });

    test('If parameter was not a number throw exception', () => {

        let message = '';

        try {
            typeparsers.parseNumber('test', errorNumber);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe(errorNumber);
    });

    test('If parameter was a number do not throw exception', () => {

        let message = '';

        try {
            typeparsers.parseNumber(123, errorNumber);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe('');
    });

    test('If parameter was empty throw exception', () => {

        let message = '';

        try {
            typeparsers.parseStringUserInput('',errorUserInputString);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe(errorUserInputString);
    });

    test('If parameter was not a string throw exception', () => {

        let message = '';

        try {
            typeparsers.parseStringUserInput(123,errorUserInputString);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe(errorUserInputString);
    });

    test('If parameter was a string do not throw exception', () => {

        let message = '';

        try {
            typeparsers.parseStringUserInput('test',errorUserInputString);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe('');
    });


    test('If parameter was empty throw exception', () => {

        let message = '';

        try {
            typeparsers.parseNumberUserInput(null,errorUserInputNumber);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe(errorUserInputNumber);
    });

    test('If parameter was not a number throw exception', () => {

        let message = '';

        try {
            typeparsers.parseNumberUserInput('test',errorUserInputNumber);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe(errorUserInputNumber);
    });

    test('If parameter was a number do not throw exception', () => {

        let message = '';


        try {
            typeparsers.parseNumberUserInput(123,errorUserInputNumber);
        }
        catch (error) {

            const test: Error = error as Error;
            message = test.message;
        }

        expect(message).toBe('');
    });

});