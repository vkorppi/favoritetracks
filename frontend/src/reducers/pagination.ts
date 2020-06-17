

import { Action  } from '../type'


export const setPagination = (start: number,last: number) => {

    return {type:'SETPAGINATION',data:{start:start,last:last}}
}

export const setSearchvalue = (searchvalue: string) => {

    return {type:'SETSEARCHVALUE',data:{start:0,last:0,searchvalue:searchvalue}}
}

const reducer = (state={start:1,last:10,searchvalue:''} , action: Action) => {

    switch (action.type) {
      case 'SETPAGINATION':
        return {
            start:action.data.start,
            last:action.data.last
        }
        case 'SETSEARCHVALUE':
            
            return {
                start:state.start,
                last:state.last,
                searchvalue:action.data.searchvalue
            }
      default: 
        return state
    }
  
  }

  export default reducer