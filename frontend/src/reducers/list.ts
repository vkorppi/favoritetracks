

import { ActionList,ListAttributes } from '../type'

const defaultState: ListAttributes={}

export const addItem = (uri: string, name: string) => {
   
    return { type: 'ADD', data: { uri: uri, name: name} }
}

export const removeItem = (uri: string) => {

    return { type: 'REMOVE', data: { uri: uri } }
}

const reducer = (state = defaultState , action: ActionList) => {

    switch (action.type) {
        case 'ADD':

            state[action.data.uri]=action.data.name
            
            return state
            
        case 'REMOVE':

            delete state[action.data.uri]
            return  state

        default:
            return state
    }

}

export default reducer