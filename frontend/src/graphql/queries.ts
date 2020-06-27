import { gql } from '@apollo/client'

const search = gql`
query filter($name: String,$page: Int) {
    search(track: $name,page: $page) 
    {
          tracks
          total
    }
  }`

const createUser = gql`
  mutation Create($username: String!,$password: String!,$firstname: String!,$lastname: String!){
    create(username: $username,password: $password,firstname:$firstname,lastname:$lastname) 
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
        id
      }
    }`;

  const deleteUser =  gql`

  mutation Remove($id: String!){
    remove(id:$id) 
    }
 `;
  
 const updateUser = gql`

 mutation UpdateName($firstname: String!,$lastname: String!,$id: String!){
   updateName(firstname:$firstname,lastname:$lastname,id:$id) 
   }
 `;


export default {
  search,
  createUser,
  searchUsers,
  getUser,
  deleteUser,
  updateUser
}