

import trackq from '../graphql/queries/track';
import userq from '../graphql/queries/user';
//import sessionq from '../graphql/queries/session';
import userm from '../graphql/mutations/user';
//import sessionm from '../graphql/mutations/session';
import trackm from '../graphql/mutations/track';

export const resolvers = {

    Query: {

        search:trackq.search,
        getFavorites:trackq.getFavorites,
        searchUser:userq.searchUser,
        getUser:userq.getUser,
        delegateToken:userq.session.delegateToken,
        getUserLoggedin:userq.session.getUserLoggedin,
        delegateRefreshedToken: userq.session.delegateRefreshedToken,
        getAuthorization: userq.getAuthorization
        //test789: sessionq.test789
    },
    Mutation: {
        
        create: userm.create,
        updateUser: userm.updateUser,
       // updatePassword:userm.updatePassword,
        remove: userm.remove,
        login: userm.session.login,
        logout: userm.session.logout,
        testi123: userm.session.testi123,
        testi345: userm.session.testi345,
        add: trackm.add,
        removeTrack: trackm.removeTrack
    }
};

