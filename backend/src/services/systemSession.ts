

import uniqid from 'uniqid';
import User from '../mongo/user';
import { UserSchemaType } from '../types/userTypes';
import { ApolloError } from 'apollo-server-express';



 const startSession = async (id: string): Promise<string> => {

    const sessionid=uniqid.process();

    await User.updateOne({ _id: id },
        {
            $set:
            {
                "sessionid": sessionid
            }
        });

        return sessionid;

};

 const hasSession = async (sessionid: string): Promise<UserSchemaType> => {

    if (!sessionid) {
        console.log("No session found");
        throw new ApolloError("Unauthorized action");
    }

    const fetchedUser = await User.findOne({ sessionid: sessionid });

    if (!fetchedUser) {
        console.log("No session found");
        throw new ApolloError("Unauthorized action");
    }

    return fetchedUser;

};

const endSession = async (sessionid: string): Promise<void> => {

    await User.updateOne({ sessionid: sessionid },
        {
            $set:
            {
                "sessionid": ""
            }
        });
};

export const session =  {
    "startSession": startSession,
    "hasSession": hasSession,
    "endSession": endSession
};


export default {
    session
};
