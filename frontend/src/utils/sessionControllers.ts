import { NewToken } from "../type";


const getTimeWhenTokenExpires = (token: NewToken): string => {

    const milliseconds: number = token.expires_in * 1000;
    const current = new Date();
    const expirationTime = new Date(current.getTime() + milliseconds);
    return expirationTime.getTime().toString();
};

// refreshToken

