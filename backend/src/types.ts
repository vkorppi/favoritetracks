
import  { Document } from 'mongoose';

export interface refreshtoken {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
  }


  export interface searchResult { 
    
    tracks:string[]
    total:number

  }

  export interface query { 
    
    search:searchResult
    

  }


  export interface spotifyResult { 
    
    tracks:spotifyTracks
      

  }
  

 export interface spotifyTracks { 

  href:string;
  items:spotifyTrack[],
  limit:number;
  next:string;
  offset:number;
  previous:string;
  total:number;

}

export interface spotifyTrack { 

  album:spotifyAlbum,
  artists:spotifyArtist[],
  available_markets:string[],
  disc_number:number,
  duration_ms:number,
  explicit:boolean,
  external_ids:spotifyExternalIds,
  external_urls:spotifArtistUrl,
  href:string,
  id:string,
  is_local:boolean,
  name:string,
  popularity:number,
  preview_url:string,
  track_number:number,
  type:string,
  uri:string
}

export interface spotifyArtist {

  external_urls:spotifArtistUrl,
  href:string,
  id:string,
  name:string,
  type:string,
  uri:string
}

export interface spotifyAlbum { 

  album_type:string,
  artists:spotifyArtist[],
  available_markets:string[],
  external_urls:spotifArtistUrl,
  href:string,
  id:string,
  images:spotifyImage[], 
  name:string,
  release_date:string,
  release_date_precision:string,
  total_tracks:number,
  type:string,
  uri:string
}

export interface spotifyImage {
  height:number,
  url:string,
  width:number

}

export interface spotifyExternalIds {
  isrc:string;

}


export interface spotifArtistUrl {
  spotify:string;

}

export interface searchEnv {
  querypart1:string;
  typepart2:string;
  offsetpart3:string;
  limitpart4:string;
  parsedToken:string
  parsedTrack:string
  offset:number;
}

export interface sessionEnv {
  granttype:string;
  refreshtoken:string;
  sessionUrl:string;
  code:string;
  secret:string;
}

export interface userToken {
  username:string;
   id: string;
}

export interface UserSchemaType extends Document {
  username:string;
  password:string;
  firstname:string;
  lastname:string;
  birthdate: string,
  email: string,
  address: string
}

export interface UserInputType extends Document {
  username:UserSchemaType['username'];
  password:UserSchemaType['password'];
  firstname:UserSchemaType['firstname'];
  lastname:UserSchemaType['lastname'];
  birthdate:UserSchemaType['birthdate'];
  email:UserSchemaType['email'];
  address:UserSchemaType['address'];

}

export interface TokenType  {
  value:string;
}

export interface DecodedToken  {
  username:string;
  id:string
}

export interface UserType {
  username:string;
  firstname:string;
  lastname:string;
  birthdate: string,
  email: string,
  address: string
}


