

import { AlertAction,AlertAttributes } from '../type'


export const setAlerts = (alert: AlertAttributes) => {

	console.log('debug2')
    return { type: 'SET', data: alert }
}


const reducer = (state = {
     
        firstname: false, lastname: false, birthdate: false, email: false,
        address: false, username: false, password: false
    
},
    action: AlertAction) => {

    switch (action.type) {
        case 'SET':
            return {
                firstname: action.data.firstname,
                lastname: action.data.lastname,
                birthdate: action.data.birthdate,
                email: action.data.email,
                address: action.data.address,
                username: action.data.username,
                password: action.data.password
            }
        default:
            return state
    }

}

export default reducer