

import { ActionModal } from '../types/modal'
import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState= { show:false }

export const setShow = createAction<ActionModal>('SET_SHOW');

const reducer = createReducer(initialState, (builder) => {
    builder
      .addCase(setShow, (state, action) => {
        state.show=action.payload.data.show;
      })
  })

export default reducer