

import { ActionMessage } from '../type'


export const setMessage = (text: string,msgtype: string) => {

   
    return { type: 'SET_MESSAGE', data: { text: text,msgtype: msgtype } }
}

export const clearMessage = () => {


    return { type: 'CLEAR_MESSAGE', data: { text: '',msgtype: '' } }
}


const reducer = (state = { text: '',msgtype:'' }, action: ActionMessage) => {

    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                text: action.data.text,
                msgtype: action.data.msgtype
            }
        case 'CLEAR_MESSAGE':
            return {
                text: action.data.text,
                msgtype: action.data.msgtype
            }

        default:
            return state
    }

}

export default reducer