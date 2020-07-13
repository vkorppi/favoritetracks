"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testParserNumber = exports.testParserString = void 0;
exports.testParserString = (value, Errormessage, parser) => {
    let message = '';
    try {
        parser(value, Errormessage);
    }
    catch (error) {
        const test = error;
        message = test.message;
    }
    return message;
};
exports.testParserNumber = (value, Errormessage, parser) => {
    let message = '';
    try {
        parser(value, Errormessage);
    }
    catch (error) {
        const test = error;
        message = test.message;
    }
    return message;
};
