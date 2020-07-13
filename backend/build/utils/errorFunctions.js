"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = void 0;
exports.getMessage = (type, value, inpunFromUser) => {
    const flag = inpunFromUser ? 'userInput: ' : '';
    switch (type) {
        case 'string':
            return `${flag} ${value} was not a string`;
            break;
        case 'number':
            return `${flag} ${value} was not a number`;
            break;
        case 'format':
            return `${flag} ${value} was not in correct format`;
            break;
        case 'EnvString':
            return `Enviroment variable: ${value} was not a string`;
            break;
        case 'EnvNumber':
            return `Enviroment variable: ${value} was not a numbers`;
            break;
        default:
            return '';
    }
    return '';
};
