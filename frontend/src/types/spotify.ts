export interface NewTrack {
    name: string;
    url: string;
    spotifUri: string;
  }
  
  export interface Track {
    name: string;
    uri: string;
    external_urls: ExternalUrlsType;
  }
  
  export interface ExternalUrlsType {
    spotify: string;
  }
  
  export interface ListAttributes {
    [key: string]: NewTrack;
  }
  
  export interface FavoritesType {
    favorites: ListAttributes;
  }