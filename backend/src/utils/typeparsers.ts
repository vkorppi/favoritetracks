/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import typeguards from '../utils/typeguards';

const parseExpiration = (value: any): number => {
    
    if(!typeguards.isNumber(value)) {
        throw new Error('Expiration time was not a number');
    }

    return value;
    
  };

  const parseEnvString = (value: any): string => {

    if(!typeguards.isString(value)) {
        throw new Error('Enviromentvariable was not a string');
    }
    return value;
  };

  const parseToken = (value: any): string => {

    if(!typeguards.isString(value)) {
        throw new Error('token was not a string');
    }
    return value;
  };

  export default {
    parseExpiration,
    parseEnvString,
    parseToken
  };