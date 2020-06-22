import { refreshtoken } from "../types";
import typeparsers from "./typeparsers";



export const getTokenExpirationTime = (token:refreshtoken): string  => {

    const parser = typeparsers.parseNumber;
    const errorMessage='Expiration time: Expiration time was not a number'

    const milliseconds:number = parser(token.expires_in,errorMessage) * 1000;
    const current = new Date();
    const expirationTime= new Date( current.getTime() + milliseconds );
    return expirationTime.getTime().toString();
};