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

  const parseId = (value: any): number => {
    
    if(!value || !typeguards.isNumber(value)) {
     
        throw  new ApolloError('Id: id was not a number');
    }

    return value;
    
  };

  const Parseusername = (value: any): string => {

    if(!value || !typeguards.isString(value)) {
     
        throw new UserInputError('Username: username was not a string');
    }
    return value;
  };

  const Parsepassword = (value: any): string => {

    if(!value || !typeguards.isString(value)) {
     
        throw new UserInputError('Password: password was not a string');
    }
    return value;
  };

  const Parsename = (value: any): string => {

    if(!value || !typeguards.isString(value)) {
     
        throw new UserInputError('lastname or firstname: name was not a string');
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
    parseId,
    Parseusername,
    Parsepassword,
    Parsename
  };