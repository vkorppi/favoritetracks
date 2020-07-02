

import { ActionList } from '../type'

const defaultState: string[]=[]

export const addItem = (trackid:string) => {

   
    return { type: 'ADD', data: { trackid: trackid } }
}

export const removeItem = (trackid: string) => {


    return { type: 'REMOVE', data: { trackid: trackid } }
}


const reducer = (state = defaultState , action: ActionList) => {

    switch (action.type) {
        case 'ADD':
            return state.concat(action.data.trackid)
            
        case 'REMOVE':
            return  state.filter((id: string) => (action.data.trackid !== id) )
            

        default:
            return state
    }

}

export default reducer