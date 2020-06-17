import { LazyQueryResult, QueryLazyOptions  } from '@apollo/client'

  export interface QueryTuple {

    searchAction: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
    searchResult: LazyQueryResult<any, Record<string, any>>;

 
  }

  export interface TotalType {
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
  }

  export type Action =
  {
    type: "SETSEARCHVALUE";
    data: PaginationAttributes;
  } |
  {
    type: "SETPAGINATION";
    data: PaginationAttributes;
  };
