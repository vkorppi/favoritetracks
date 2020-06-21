/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import typeguards from '../utils/typeguards';
import { ApolloError, UserInputError } from 'apollo-server-express';

const parseExpiration = (value: any): number => {
    
    if(!value || !typeguards.isNumber(value)) {

     throw new ApolloError('Expiration time: Expiration time was not a number');

    }

    return value;
    
  };

  const parseEnvString = (value: any): string => {

    if(!value || !typeguards.isString(value) || typeguards.isNumber(value)) {
  
        throw new ApolloError('Enviroment variable: variable was not a string');
    }
    return value;
  };
  
  const parseEnvNumber = (value: any): number => {

    if(!value || !typeguards.isNumber(value)) {
  
        throw new ApolloError('Enviroment variable: variable was not a number');
    }
    return value;
  };

  const parseToken = (value: any): string => {

    if(!value || !typeguards.isString(value)) {
      
        throw new ApolloError('Token: token was not a string');
    }
    return value;
  };

  const parseTrack = (value: any): string => {

    if(!value || !typeguards.isString(value)) {
     
        throw new UserInputError('Track: track was not a string');
    }
    return value;
  };

  const parsePage = (value: any): number => {
    
    if(!value || !typeguards.isNumber(value)) {
     
        throw  new UserInputError('Page: Page was not a number');
    }

    return value;
    
  };

  const parsePage = (value: any): number => {
    
    if(!value || !typeguards.isNumber(value)) {
     
        throw  new UserInputError('Page: Page was not a number');
    }

    return value;
    
  };

  const parseId = (value: any): number => {
    
    if(!value || !typeguards.isNumber(value)) {
     
        throw  new UserInputError('Id: id was not a number');
    }

    return value;
    
  };

  export default {
    parseExpiration,
    parseEnvString,
    parseEnvNumber,
    parseToken,
    parseTrack,
    parsePage,
    parseId
  };