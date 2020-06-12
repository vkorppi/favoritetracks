

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

        let exceptionThrown=false;

        try {
            typeparsers.parseEnvString('');
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was not a string throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseEnvString(123);
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was a string do not throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseEnvString('test');
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(false);
    });

    

    test('If parameter was empty throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseExpiration(null);
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was not a number throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseExpiration('test');
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was a number do not throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseExpiration(123);
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(false);
    });

    test('If parameter was empty throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseToken('');
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was not a string throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseToken(123);
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was a string do not throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseToken('test');
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(false);
    });

    test('If parameter was empty throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseTrack('');
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was not a string throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseTrack(123);
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was a string do not throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parseTrack('test');
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(false);
    });


    test('If parameter was empty throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parsePage(null);
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was not a number throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parsePage('test');
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(true);
    });

    test('If parameter was a number do not throw exception', () => {

        let exceptionThrown=false;

        try {
            typeparsers.parsePage(123);
        }
        catch(error) {
            
            exceptionThrown=true;
        }
      
        expect(exceptionThrown).toBe(false);
    });

});