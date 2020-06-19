import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { MessageType } from '../type'


export const showMessage = (
    message: string,time: number
  ): ThunkAction<void, MessageType, unknown, Action<string>> =>  dispatch => {

  }