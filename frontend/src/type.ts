import { LazyQueryResult, QueryLazyOptions, ApolloError } from '@apollo/client'

export interface QueryTuple {

  searchAction: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
  searchResult: LazyQueryResult<any, Record<string, any>>;


}

export interface SearchAttributes {
  total: number;
  searchObject: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
}


export interface PaginationType {
  pagination: PaginationAttributes;
}

export interface PaginationAttributes {
  start: number;
  last: number;
  searchvalue: string;
  currentPage: number;
}

export type Action =
  {
    type: "UPDATE";
    data: PaginationAttributes;
  } |
  {
    type: "SET";
    data: PaginationAttributes;
  } |
  {
    type: "SETPAGE";
    data: PaginationAttributes;
  };


export interface SearchResult {

  tracks: string[];
  total: number;

}

export interface Query {

  search: SearchResult;


}

export interface MessageType {
  message: MessageAttributes;
}

export interface MessageAttributes {
  text: string;
}

export type ActionMessage =
  {
    type: "SET_MESSAGE";
    data: MessageAttributes;
  } |
  {
    type: "CLEAR_MESSAGE";
    data: MessageAttributes;
  };


export interface SpotifyTracks {

  href: string;
  items: SpotifyTrack[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;

}

export interface SpotifyTrack {

  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifArtistUrl;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface SpotifyArtist {

  external_urls: SpotifArtistUrl,
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyAlbum {

  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: SpotifArtistUrl;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;

}

export interface SpotifyExternalIds {
  isrc: string;

}


export interface SpotifArtistUrl {
  spotify: string;

}

export interface RegistarationType {
  name: string;

}