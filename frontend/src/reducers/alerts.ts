

import { createAction, createReducer } from '@reduxjs/toolkit'

type AlertAttributes = {

  [key: string]: boolean;
}

export const setAlerts = createAction<AlertAttributes>('SET');

const initialState = {
     
    firstname: false, lastname: false, birthdate: false, email: false,
    address: false, username: false, password: false,other:false
   
}

const reducer = createReducer(initialState, (builder) => {
    builder
      .addCase(setAlerts, (state, action) => {
        state.firstname=action.payload.firstname;
        state.lastname=action.payload.lastname;
        state.birthdate=action.payload.birthdate;
        state.email=action.payload.email;
        state.address=action.payload.address;
        state.username=action.payload.username;
        state.password=action.payload.password;
        state.other=action.payload.other;
      })

  })

export default reducer