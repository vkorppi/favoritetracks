/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const isNumber = (value: any): value is number => {

    return !isNaN(Number(value));
  };

const isString = (value: any): value is string => {

    return typeof value === 'string';
};

const isEmail = (value: any): value is string => {

  const emailCheck = /.*\..*@.*\..*/i;

  return emailCheck.test(value);
};

const isDate = (value: any): value is string => {

  const birthdateCheck =/^(([0-2][0-9])|([3][0-2]))\.((0[1-9])|(1[0-2]))\.([1-9][0-9][0-9][0-9])$/i;

  return birthdateCheck.test(value);
};



  export default {
    isNumber,
    isString,
    isEmail,
    isDate
  };