

import { ActionList,ListAttributes } from '../type'

const defaultState: ListAttributes={}

export const addItem = (uri: string, name: string) => {
   
    return { type: 'ADD', data: { uri: uri, name: name} }
}

export const removeItem = (uri: string) => {

    return { type: 'REMOVE', data: { uri: uri } }
}

export const clearItems = () => {

    return { type: 'CLEAR', data: {} }
}


const reducer = (state = defaultState , action: ActionList) => {

    switch (action.type) {
        case 'ADD':

            /*
            state[action.data.uri]=action.data.name
            
            return state
            */
           return { ...state, [action.data.uri]: action.data.name }
            
        case 'REMOVE':
            
            /*
            delete state[action.data.uri]
            return  state
            */

           // eslint-disable-next-line no-case-declarations
           const newstate = { ...state, [action.data.uri]: action.data.name }
           delete newstate[action.data.uri]

           return newstate

        case 'CLEAR':
            /*
            Object.keys(state).forEach(key => { delete state[key] })
            return  state
            */
           return {}

        default:
            return state
    }

}

export default reducer