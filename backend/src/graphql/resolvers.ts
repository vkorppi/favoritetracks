

import trackq from '../graphql/queries/track';
import userq from '../graphql/queries/user';
import sessionq from '../graphql/queries/session';
import userm from '../graphql/mutations/user';
import sessionm from '../graphql/mutations/session';
import trackm from '../graphql/mutations/track';

export const resolvers = {

    Query: {

        search:trackq.search,
        getList:trackq.getList,
        searchUser:userq.searchUser,
        getUser:userq.getUser,
        delegateToken:sessionq.delegateToken,
        getUserLoggedin:sessionq.getUserLoggedin,
        delegateRefreshedToken: sessionq.delegateRefreshedToken
    },
    Mutation: {

        create: userm.create,
        updateUser: userm.updateUser,
        updatePassword:userm.updatePassword,
        remove: userm.remove,
        login: sessionm.login,
        addTrackToList: trackm.addTrackToList,
        removeItem: trackm.removeItem
    }
};

