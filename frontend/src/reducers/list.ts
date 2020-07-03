

import { ActionList,ListAttributes } from '../type'

const defaultState: ListAttributes[]=[]

export const addItem = (uri: string, value: string) => {

   
    return { type: 'ADD', data: { uri: uri, value: value} }
}

export const removeItem = (uri: string) => {


    return { type: 'REMOVE', data: { uri: uri } }
}


const reducer = (state = defaultState , action: ActionList) => {

    switch (action.type) {
        case 'ADD':
            return state.concat({uri:action.data.uri,name:action.data.name})
            
        case 'REMOVE':
            return  state.filter((id: number) => (action.data.uri !== id) )
            

        default:
            return state
    }

}

export default reducer