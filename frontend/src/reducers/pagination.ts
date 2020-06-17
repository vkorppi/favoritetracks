

import { PaginationType, Action  } from '../type'

export const setPagination = (start: number,last: number,total: number) => {

    return {start:start,last:last,total:total}
}

const reducer = (state: PaginationType , action: Action) => {

    switch (action.type) {
      case 'SET':
        return {start:action.data.start,
            last:action.data.last,
            total:action.data.total}
      default: 
        return state
    }
  
  }

  export default reducer