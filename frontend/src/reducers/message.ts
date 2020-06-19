

import { ActionMessage } from '../type'


export const setMessage = (text: string) => {

   
    return { type: 'SET_MESSAGE', data: { text: text } }
}

export const clearMessage = () => {


    return { type: 'CLEAR_MESSAGE', data: { text: '' } }
}


const reducer = (state = { text: '' }, action: ActionMessage) => {

    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                text: action.data.text
            }
        case 'CLEAR_MESSAGE':
            return {
                text: action.data.text,
            }

        default:
            return state
    }

}

export default reducer