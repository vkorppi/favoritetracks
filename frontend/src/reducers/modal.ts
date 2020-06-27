

import { ActionModal } from '../type'


export const setShow = (show: boolean) => {

   
    return { type: 'SET_SHOW', data: { show: show } }
}



const reducer = (state = { show:false }, action: ActionModal) => {

    switch (action.type) {
        case 'SET_SHOW':
            return {
                show: action.data.show
            }

        default:
            return state
    }

}

export default reducer