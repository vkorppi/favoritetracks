import { gql } from '@apollo/client'

const searchUsers = gql`
query filter($value: String){
  searchUser(value: $value) 
  {
    firstname,
    lastname,
    username,
    id
    }
  }`

const getUser = gql`

  query getUser($id: String!){
    getUser(id: $id) 
      {
        firstname,
        lastname,
        username,
        birthdate,
        email,
        address
        id
      }
    }`;

const createUser = gql`
  mutation Create($username: String!,$password: String!,$firstname: String!,$lastname: String!
    ,$birthdate: String,$email: String,$address: String){
    create(username: $username,password: $password,firstname:$firstname,lastname:$lastname,
      ,birthdate:$birthdate,email:$email,address:$address) 
    }
  `

  const deleteUser = gql`

  mutation Remove($id: String!){
    remove(id:$id) 
    }
 `;

const updateUser = gql`

 mutation UpdateUser($firstname: String!,$lastname: String!,$birthdate: String,
  $email: String,$address: String,$id: String!){
  updateUser(firstname:$firstname,lastname:$lastname,birthdate:$birthdate
  ,email:$email,address:$address,id:$id) 
  }
 `;

const updatePassword = gql`

 mutation UpdatePassword($password: String!,$id: String!){
  updatePassword(password:$password,id:$id) 
  }
 `;

 const loggedInUser = gql`

 query {
   getUserLoggedin {
     
       firstname,
       lastname,
       username,
       birthdate,
       email,
       address,
       id,
       playlist,
       admin
   }
 }`;

 const getAuthorization = gql`

 query {
  getAuthorization {
    authenticated,
    admin
   }
 }`;


export default {
    searchUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    updatePassword,
    loggedInUser,
    getAuthorization
}