

import {  spotifyTrack  } from '../types/spotifyTypes';
import { Document } from 'mongoose';


  
  export interface fetchedFavorites {
    items: [Favorite]
  }
  
  export interface Favorite {
    track: spotifyTrack
  }
  
  export interface TrackSchemaType extends Document {
    name: string;
    url: string;
    spotifUri: string;
    users:string[]
  }

  export interface track  {
    name: string;
    url: string;
    spotifUri: string;
  }