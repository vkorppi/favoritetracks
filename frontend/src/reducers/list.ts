

import { ListAttributes } from '../type'
import { createAction, createReducer } from '@reduxjs/toolkit'

export interface TrackUriName {
    uri: string;
    name: string;
  }

const initialState: ListAttributes={}

export type TrackOnlyName = Omit<TrackUriName, 'name' >;
export const addItem = createAction<TrackUriName>('ADD');
export const removeItem = createAction<TrackOnlyName>('REMOVE');
export const clearItems = createAction('CLEAR');

const reducer = createReducer(initialState, (builder) => {
    builder
      .addCase(addItem, (state, action) => {
        state[action.payload.uri]=action.payload.name;
      })
      .addCase(removeItem, (state, action) => {
        delete state[action.payload.uri]

      })
      .addCase(clearItems, (state, action) => {
        state={}
      })
  })

export default reducer