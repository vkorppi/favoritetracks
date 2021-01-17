

import { ActionModal } from '../types/modal'
import produce from "immer"

export const setShow = (show: boolean) => {

   
    return { type: 'SET_SHOW', data: { show: show } }
}



const reducer = (state = { show:false }, action: ActionModal) => {

    switch (action.type) {
        case 'SET_SHOW':

            return produce(state, draft => {
                draft.show=action.data.show;
            })

            /*
            return {
                show: action.data.show
            }
            */

        default:
            return state
    }

}

export default reducer