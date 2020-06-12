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
exports.default = {
    isNumber,
    isString
};
