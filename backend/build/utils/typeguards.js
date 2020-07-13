"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
Object.defineProperty(exports, "__esModule", { value: true });
const isNumber = (value) => {
    return !isNaN(Number(value));
};
const isString = (value) => {
    return typeof value === 'string';
};
const isEmail = (value) => {
    const emailCheck = /.*\..*@.*\..*/i;
    return emailCheck.test(value);
};
const isDate = (value) => {
    const birthdateCheck = /^(([0-2][0-9])|([3][0-2]))\.((0[1-9])|(1[0-2]))\.([1-9][0-9][0-9][0-9])$/i;
    return birthdateCheck.test(value);
};
exports.default = {
    isNumber,
    isString,
    isEmail,
    isDate
};
