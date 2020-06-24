import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { MessageType } from '../type'
import { setMessage,clearMessage } from '../reducers/message'

let timeid=0

export const showMessage = (
    message: string,time: number,messageType: string
  ): ThunkAction<void, MessageType, unknown, Action<string>> =>  dispatch => {

  if(timeid === 0) {
    dispatch(setMessage(message,messageType)) 
    
      timeid=window.setTimeout(() => {
          dispatch(clearMessage())
          timeid=0
        }, time)
    }
  }