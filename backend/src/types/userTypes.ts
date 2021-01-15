
import { Document } from 'mongoose';

export interface UserType {
    username: string;
    firstname: string;
    lastname: string;
    birthdate: string,
    email: string,
    address: string
  }

  export interface UserSchemaType extends Document {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    birthdate: string,
    email: string,
    address: string,
    favorites:string
    admin: boolean;
  }