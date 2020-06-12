/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import typeguards from '../utils/typeguards';
import { ApolloError } from 'apollo-server';

const parseExpiration = (value: any): number => {
    
    if(!value || !typeguards.isNumber(value)) {
      console.log(new ApolloError('Expiration time: Expiration time was not a number'));
        throw new ApolloError('Expiration time');
    }

    return value;
    
  };

  const parseEnvString = (value: any): string => {

    if(!value || !typeguards.isString(value) || typeguards.isNumber(value)) {
        console.log(new ApolloError('Enviroment variable: variable was not a string'));
        throw new ApolloError('Enviroment variable');
    }
    return value;
  };

  const parseToken = (value: any): string => {

    if(!value || !typeguards.isString(value)) {
        console.log(new ApolloError('Token: token was not a string'));
        throw new ApolloError('Token');
    }
    return value;
  };

  export default {
    parseExpiration,
    parseEnvString,
    parseToken
  };