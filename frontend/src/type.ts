import { LazyQueryResult, QueryLazyOptions  } from '@apollo/client'

  export interface queryTuple {

    searchAction:(options?: QueryLazyOptions<Record<string, any>> | undefined) => void
    searchResult: LazyQueryResult<any, Record<string, any>>

 
  }

