import { LazyQueryResult, QueryLazyOptions  } from '@apollo/client'

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
  }|
  {
    type: "SETPAGE";
    data: PaginationAttributes;
  };
