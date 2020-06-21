import { refreshtoken } from "../types";
import typeparsers from "./typeparsers";



export const getTokenExpirationTime = (token:refreshtoken): string  => {

    const milliseconds:number = typeparsers.parseNumber(token.expires_in,'Expiration time: Expiration time was not a number') * 1000;
    const current = new Date();
    const expirationTime= new Date( current.getTime() + milliseconds );
    return expirationTime.getTime().toString();
};