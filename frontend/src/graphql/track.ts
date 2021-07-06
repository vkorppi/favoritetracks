import { gql } from '@apollo/client'

 const addTrack = gql`

 mutation Add($tracks: [trackInput!]!){
  add(tracks: $tracks)  
  }

 `;

 const removeTrack = gql`

 mutation RemoveTrack($track: trackInput!){
   removeTrack(track: $track) 
     
   }`;

   const getFavorites = gql`
   query {
     getFavorites {
         name,
         url,
         spotifUri
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
    getFavorites,
    search
}