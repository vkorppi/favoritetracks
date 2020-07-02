/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import typeguards from '../utils/typeguards';
import { ApolloError, UserInputError } from 'apollo-server-express';


const parseString = (value: any, error: string): string => {

  if (!value || !typeguards.isString(value) || typeguards.isNumber(value)) {

    throw new ApolloError(error);
  }
  return value;
};

const parseNumber = (value: any, error: string): number => {

  if (!value || !typeguards.isNumber(value)) {

    throw new ApolloError(error);
  }
  return value;
};


const parseStringUserInput = (value: any, error: string): string => {

  if (!value || !typeguards.isString(value)) {

    throw new UserInputError(error);
  }
  return value;
};

const parseNumberUserInput = (value: any, error: string): number => {

  if (!value || !typeguards.isNumber(value)) {

    throw new UserInputError(error);
  }

  return value;

};


const parseEmailUserInput = (value: any, error: string): string => {

  if (!value || !typeguards.isString(value) || !typeguards.isEmail(value)) {

    throw new UserInputError(error);
  }
  return value;
};

const parseBirthdate = (value: any, error: string): string => {

  console.debug(typeguards.isDate(value));

  if (!value || !typeguards.isString(value) || !typeguards.isDate(value)) {

    throw new UserInputError(error);
  }
  return value;
};



export default {
  parseString,
  parseNumber,
  parseStringUserInput,
  parseNumberUserInput,
  parseEmailUserInput,
  parseBirthdate
};