

import {  spotifyTrack  } from '../types/spotifyTypes';
import { Document } from 'mongoose';

export interface favorites {
    id: string
  }
  
  export interface favoritesSearchResult {
    items: [favoritesSearchResultItem]
  }
  
  export interface favoritesSearchResultItem {
    track: spotifyTrack
  }
  
  export interface TrackSchemaType extends Document {
    name: string;
    url: string;
    spotifUri: string;
    users:string[]
  }

  export interface trackObject  {
    name: string;
    url: string;
    spotifUri: string;
  }