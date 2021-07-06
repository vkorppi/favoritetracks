import { gql } from '@apollo/client'

const login = gql`

mutation Login($username: String!,$password: String!){
 login(username:$username,password:$password)
   {
    authenticated,
    admin
   }  
 }
`;

const logout = gql`

mutation {
 logout
   {
    status
   }  
 }
`;

const delegateToken = gql`

query delegateToken($code: String!, $playlist: String!){
  delegateToken(code: $code, playlist: $playlist) 
    {
      access_token,
      refresh_token,
      expires_in
    }
  }`;

const delegateRefreshedToken = gql`

query delegateRefreshedToken($refreshedToken: String!){
  delegateRefreshedToken(refreshedToken: $refreshedToken) 
    {
      access_token,
      token_type,
      expires_in,
      scope
    }
  }`;

export default {
  login,
  delegateToken,
  delegateRefreshedToken,
  logout
}