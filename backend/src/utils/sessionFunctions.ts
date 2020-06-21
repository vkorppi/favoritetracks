import { refreshtoken } from "../types";
import typeparsers from "./typeparsers";



export const getToken = (token:string): void  => {

    console.log(token);

};

export const getTokenExpirationTime = (token:refreshtoken): string  => {

    const milliseconds:number = typeparsers.parseExpiration(token.expires_in) * 1000;
    const current = new Date();
    const expirationTime= new Date( current.getTime() + milliseconds );
    return expirationTime.getTime().toString();
};