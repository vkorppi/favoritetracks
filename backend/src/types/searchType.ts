
import {  spotifyTrackMinimal,spotifyTracks  } from '../types/spotifyTypes';

export interface searchResult {

    tracks: spotifyTrackMinimal[]
    total: number
  
  }
  
  export interface query {
  
    search: searchResult
  
  }
  
  
  export interface spotifyResult {
  
    tracks: spotifyTracks
  
  }