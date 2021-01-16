import { gql } from '@apollo/client'

 const addTrack = gql`

 mutation AddTrackToList($tracks: [String!]!){
  addTrackToList(tracks: $tracks)  
  }
 `;

 const removeTrack = gql`

 mutation removeItem($tracks: [String!]!){
   removeItem(tracks: $tracks) 
     
   }`;

   const getList = gql`
   query {
     getList {
         name,
         uri
     }
   }`
   ;

   const search = gql`
   query filter($name: String,$page: Int) {
       search(track: $name,page: $page) 
       {
        tracks {
            name,
            uri,
            external_urls {
              spotify
            }
          }
          total
        }
     }
     `


export default {
    addTrack,
    removeTrack,
    getList,
    search
}