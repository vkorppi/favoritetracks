import { gql } from '@apollo/client'

 const addTrack = gql`

 mutation AddTrackToList($tracks: [trackInput!]!){
  addTrackToList(tracks: $tracks)  
  }

 `;

 const removeTrack = gql`

 mutation removeItem($track: trackInput!){
   removeItem(track: $track) 
     
   }`;

   const getList = gql`
   query {
     getList {
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
    getList,
    search
}