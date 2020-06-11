export interface refreshtoken {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
  }

 /* 
  export interface spotifyList {

    tracks:
      

  }
  */

 export interface spotifyTracks {

  href:string;
  //items:
  limit:number;
  next:string;
  offset:number;
  previous:string;
  total:number;

}

