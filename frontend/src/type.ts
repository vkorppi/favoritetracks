import { LazyQueryResult, QueryLazyOptions  } from '@apollo/client'

  export interface QueryTuple {

    searchAction:(options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
    searchResult: LazyQueryResult<any, Record<string, any>>

 
  }

  export interface PaginationType {
    start: number;
    last: number;
    total: number;
  }

  export type Action =
  {
    type: "INIT";
    data: PaginationType;
  } |
  {
    type: "SET";
    data: PaginationType;
  };
