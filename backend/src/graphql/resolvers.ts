

import trackq from '../graphql/queries/track';
import userq from '../graphql/queries/user';
import userm from '../graphql/mutations/user';
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
    },
    Mutation: {
        
        create: userm.create,
        updateUser: userm.updateUser,
        remove: userm.remove,
        login: userm.session.login,
        logout: userm.session.logout,
        add: trackm.add,
        removeTrack: trackm.removeTrack
    }
};

