

import {  spotifyTrack  } from '../types/spotifyTypes';

export interface favorites {
    id: string
  }
  
  export interface favoritesSearchResult {
    items: [favoritesSearchResultItem]
  }
  
  export interface favoritesSearchResultItem {
    track: spotifyTrack
  }
  