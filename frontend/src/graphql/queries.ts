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


export default {
  search,
  createUser
}