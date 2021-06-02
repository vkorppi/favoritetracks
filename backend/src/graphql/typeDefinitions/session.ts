

import { gql } from 'apollo-server-express';


export const sessionMutation = gql`

extend type Mutation {
  login(
    username: String!
    password: String!
  ): loginResponse 
}

extend type Mutation {
  logout: logoutResponse 
}

extend type Mutation {
  testi123(
    username: String!
    password: String!
  ): encodedToken 
}

extend type Mutation {
  testi345(
    username: String!
    password: String!
  ): encodedToken 
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
    test789(test:String):test1
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

  type test1 {
    test: String
  }
  
`;

export default {
  sessionMutation,
  sessionQuery
};