/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSessionEnvs } from "./envFunctions";
import mongoose from 'mongoose';
import typeparsers from '../utils/typeparsers';
import User from '../mongo/user';
import { UserSchemaType } from "../types";
import { hashPassword } from "./userFunctions";
import { sign } from "jsonwebtoken";
import ApolloClient from 'apollo-boost';

export const testParserString = (value: any, Errormessage: string, parser: (value: any, error: string) => string): string => {

    let message = '';

    try {
        parser(value, Errormessage);
    }
    catch (error) {

        const test: Error = error as Error;
        message = test.message;

    }


    return message;
};

export const testParserNumber = (value: any, Errormessage: string, parser: (value: any, error: string) => number): string => {

    let message = '';

    try {
        parser(value, Errormessage);
    }
    catch (error) {

        const test: Error = error as Error;
        message = test.message;

    }


    return message;
};