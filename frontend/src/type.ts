import { QueryLazyOptions } from "@apollo/client";


export interface SearchAttributes {
  total: number;
  search: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
}


// Joudutaan muuttamaan
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
// Joudutaan muuttamaan

export type trackNoExternalUrl = Omit<Track, 'external_urls' >;

export interface ExternalUrlsType {
  spotify: string;
}

export interface QueryResult {

  search: SearchResult;

}

export interface SearchResult {

  tracks: Track[];
  total: number;

}

  export interface ListAttributes {
    [key: string]: NewTrack;
  }

export type ActionList =
  {
    type: "ADD";
    data: ListAttributes;
  } |
  {
    type: "REMOVE";
    data: ListAttributes;
  } |
  {
    type: "CLEAR";
    data: ListAttributes;
  };

  export interface ListType {
    list: ListAttributes;
  }
  
  export type ActionFavorites =
  {
    type: "SET";
    data: FavoritesAttributes;
  };
  
  export interface FavoritesAttributes {
    tracks: Track[];
  }


export interface RefreshedToken {
  access_token: string;
  expires_in: string;
}
