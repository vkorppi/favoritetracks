

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

    test('If parameter was empty throw exception', () => {

        let message='';

        try {
            typeparsers.parseEnvString('');
        }
        catch(error) {
            
            const test:Error=error as Error ;
             message=test.message;

        }
        expect(message).toBe('Enviroment variable: variable was not a string');
      
    });

    test('If parameter was not a string throw exception', () => {

        let message='';

        try {
            typeparsers.parseEnvString(123);
        }
        catch(error) {
            
            const test:Error=error as Error ;
             message=test.message;
        }
      
        expect(message).toBe('Enviroment variable: variable was not a string');
    });

    test('If parameter was a string do not throw exception', () => {

        let message='';

        try {
            typeparsers.parseEnvString('test');
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('');
    });
	
	    test('If parameter was empty throw exception', () => {

        let message='';

        try {
            typeparsers.parseEnvNumber('');
        }
        catch(error) {
            
            const test:Error=error as Error ;
             message=test.message;

        }
        expect(message).toBe('Enviroment variable: variable was not a number');
      
    });

    test('If parameter was not a number throw exception', () => {

        let message='';

        try {
            typeparsers.parseEnvNumber('test');
        }
        catch(error) {
            
            const test:Error=error as Error ;
             message=test.message;
        }
      
        expect(message).toBe('Enviroment variable: variable was not a number');
    });

    test('If parameter was a number do not throw exception', () => {

        let message='';

        try {
            typeparsers.parseEnvNumber(123);
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('');
    });

    

    test('If parameter was empty throw exception', () => {

        let message='';

        try {
            typeparsers.parseExpiration(null);
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('Expiration time: Expiration time was not a number');
    });

    test('If parameter was not a number throw exception', () => {

        let message='';

        try {
            typeparsers.parseExpiration('test');
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('Expiration time: Expiration time was not a number');
    });

    test('If parameter was a number do not throw exception', () => {

        let message='';

        try {
            typeparsers.parseExpiration(123);
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('');
    });

    test('If parameter was empty throw exception', () => {

        let message='';

        try {
            typeparsers.parseToken('');
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('Token: token was not a string');
    });

    test('If parameter was not a string throw exception', () => {

        let message='';

        try {
            typeparsers.parseToken(123);
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('Token: token was not a string');
    });

    test('If parameter was a string do not throw exception', () => {

        let message='';

        try {
            typeparsers.parseToken('test');
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('');
    });

    test('If parameter was empty throw exception', () => {

        let message='';

        try {
            typeparsers.parseTrack('');
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('Track: track was not a string');
    });

    test('If parameter was not a string throw exception', () => {

        let message='';

        try {
            typeparsers.parseTrack(123);
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('Track: track was not a string');
    });

    test('If parameter was a string do not throw exception', () => {

        let message='';

        try {
            typeparsers.parseTrack('test');
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('');
    });


    test('If parameter was empty throw exception', () => {

        let message='';

        try {
            typeparsers.parsePage(null);
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('Page: Page was not a number');
    });

    test('If parameter was not a number throw exception', () => {

        let message='';

        try {
            typeparsers.parsePage('test');
        }
        catch(error) {
                    
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('Page: Page was not a number');
    });

    test('If parameter was a number do not throw exception', () => {

        let message='';


        try {
            typeparsers.parsePage(123);
        }
        catch(error) {
            
            const test:Error=error as Error ;
            message=test.message;
        }
      
        expect(message).toBe('');
    });

});