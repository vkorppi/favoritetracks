

import { ActionList } from '../type'


export const addItem = (trackid:string) => {

   
    return { type: 'ADD', data: { trackid: trackid } }
}

export const removeItem = (trackid: string) => {


    return { type: 'REMOVE', data: { trackid: trackid } }
}


const reducer = (state = { list:[''] }, action: ActionList) => {

    switch (action.type) {
        case 'ADD':
            return {
                list: state.list.concat(action.data.trackid)
            }
        case 'REMOVE':
            return {
                
                list: state.list.filter((id: string) => (action.data.trackid !== id) )
            }

        default:
            return state
    }

}

export default reducer