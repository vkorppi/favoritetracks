

import { MessageAttributes } from '../types/alerts'
import { createAction, createReducer } from '@reduxjs/toolkit'

type ActionMessage =
{

  data: MessageAttributes;
} |
{

  data: MessageAttributes;
};

export const setMessage = createAction<ActionMessage>('SET_MESSAGE');
export const clearMessage = createAction<ActionMessage>('CLEAR_MESSAGE');

const initialState = { text: '',msgtype:'' }

const reducer = createReducer(initialState, (builder) => {
    builder
      .addCase(setMessage, (state, action) => {
        state.text=action.payload.data.text;
        state.msgtype=action.payload.data.msgtype;
      })
      .addCase(clearMessage, (state, action) => {
        state.text=action.payload.data.text;
        state.msgtype=action.payload.data.msgtype;
      })
  })

export default reducer