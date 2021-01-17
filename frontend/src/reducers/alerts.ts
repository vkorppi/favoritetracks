

import { AlertAction,AlertAttributes } from '../types/alerts'
import produce from "immer"

export const setAlerts = (alert: AlertAttributes) => {

    return { type: 'SET', data: alert }
}


const reducer = (state = {
     
        firstname: false, lastname: false, birthdate: false, email: false,
        address: false, username: false, password: false,other:false
       
},
    action: AlertAction) => {

    switch (action.type) {
        case 'SET':
            /*
            return {
                firstname: action.data.firstname,
                lastname: action.data.lastname,
                birthdate: action.data.birthdate,
                email: action.data.email,
                address: action.data.address,
                username: action.data.username,
                password: action.data.password,
                other:action.data.other
            }
            */
           return produce(state, draft => {
            draft.firstname=action.data.firstname;
            draft.lastname=action.data.lastname;
            draft.birthdate=action.data.birthdate;
            draft.email=action.data.email;
            draft.address=action.data.address;
            draft.username=action.data.username;
            draft.password=action.data.password;
            draft.other=action.data.other;
        })

        default:
            return state
    }

}

export default reducer