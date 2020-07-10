import { RefreshedToken } from "../type";



export const getTimeWhenTokenExpires = (expiration: number): string => {

    const milliseconds: number = expiration * 1000;
    const current = new Date();
    const expirationTime = new Date(current.getTime() + milliseconds);
    return expirationTime.getTime().toString();
};

const refreshToken = async (refreshToken: string): Promise<RefreshedToken> => {

    // Change refresh token for new token


};



export default {
    getTimeWhenTokenExpires
}
