import { gql } from '@apollo/client'

/*
const search = gql`
query filter($name: String,$page: Int) {
    search(track: $name,page: $page) 
    {
          tracks
          total
    }
  }
  `
  */

 const search = gql`
 query filter($name: String,$page: Int) {
     search(track: $name,page: $page) 
     {
      tracks {
          name,
          uri
        }
        total
      }
   }
   `

const createUser = gql`
  mutation Create($username: String!,$password: String!,$firstname: String!,$lastname: String!
    ,$birthdate: String,$email: String,$address: String){
    create(username: $username,password: $password,firstname:$firstname,lastname:$lastname,
      ,birthdate:$birthdate,email:$email,address:$address) 
    }
  `
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

 const login = gql`

 mutation Login($username: String!,$password: String!){
  login(username:$username,password:$password)
	{
		value
	}  
  }
 `;

export default {
  search,
  createUser,
  searchUsers,
  getUser,
  deleteUser,
  updateUser,
  updatePassword,
  login
}