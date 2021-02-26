

import { ListAttributes } from '../type'
import { createAction, createReducer } from '@reduxjs/toolkit'

export interface TrackUriName {
  name: string;
  url: string;
  spotifUri: string;
}


const initialState: ListAttributes = {}

export type TrackOnlyName = Omit<TrackUriName, 'name'|'url'>;
export const addItem = createAction<TrackUriName>('ADD');
export const removeItem = createAction<TrackOnlyName>('REMOVE');
export const clearItems = createAction('CLEAR');

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItem, (state, action) => {
      state[action.payload.spotifUri] = action.payload;
    })
    .addCase(removeItem, (state, action) => {
      delete state[action.payload.spotifUri]

    })
    .addCase(clearItems, (state, action) => {
      return state = initialState
    })
})

export default reducer