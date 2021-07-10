

import { gql } from 'apollo-server-express';


export const sessionMutation = gql`

extend type Mutation {
  login(
    username: String!
    password: String!
  ): Authorization 
}

extend type Mutation {
  logout: logoutResponse 
}


type encodedToken {
  value : String!
  admin : Boolean!
}

type loginResponse {
  status : String!
}

type logoutResponse {
  status : String!
}

  
`;

export const sessionQuery = gql`

 type Query {
    delegateToken(code: String,playlist: String): spotifyToken!
    delegateRefreshedToken(refreshedToken: String!): refreshedToken!
  }

type spotifyToken {
    access_token: String!
    refresh_token: String!
    expires_in: Int!
  }

  type refreshedToken {
    access_token: String!
    token_type: String!
    expires_in: Int!
    scope: String!
  }


  
`;

export default {
  sessionMutation,
  sessionQuery
};