/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const isNumber = (value: any): value is number => {

    return !isNaN(Number(value));
  };

const isString = (value: any): value is string => {

    return typeof value === 'string';
};


  export default {
    isNumber,
    isString
  };