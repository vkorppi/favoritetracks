import { gql } from '@apollo/client'

const search = gql`
query filter($name: String,$page: Int) {
    search(track: $name,page: $page) 
    {
          tracks
          total
    }
  }`


  export default {
    search
  }