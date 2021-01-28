

import {PaginationAttributes,PaginationAttributesNosearchvalue,PaginationAttributesOnlycurrentPage} from '../types/pagination'
import { createAction, createReducer } from '@reduxjs/toolkit'

export const setPagination = createAction<PaginationAttributes>('SET');
export const updatePagination = createAction<PaginationAttributesNosearchvalue>('UPDATE');
export const setPage = createAction<PaginationAttributesOnlycurrentPage>('SETPAGE');

const initialState = { start: 1, last: 10, searchvalue: '', currentPage: 1 }

const reducer = createReducer(initialState, (builder) => {
    builder
      .addCase(setPagination, (state, action) => {
        state.start=action.payload.start;
        state.last=action.payload.last;
        state.searchvalue= action.payload.searchvalue;
        state.currentPage=action.payload.currentPage
      })
      .addCase(updatePagination, (state, action) => {
        state.start=action.payload.start;
        state.last=action.payload.last;
        state.currentPage=action.payload.currentPage
      })
      .addCase(setPage, (state, action) => {
        state.currentPage=action.payload.currentPage
      })
  })

export default reducer