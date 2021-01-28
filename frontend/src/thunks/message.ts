import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { MessageType } from '../types/alerts'
import { setMessage,clearMessage } from '../reducers/message'

let timeid=0

export const showMessage = (
    message: string,time: number,messageType: string
  ): ThunkAction<void, MessageType, unknown, Action<string>> =>  dispatch => {

  if(timeid === 0) {
    dispatch(setMessage({data:{text:message,msgtype:messageType}})) 
    
      timeid=window.setTimeout(() => {
          dispatch(clearMessage({data:{text:'',msgtype:''}}))
          timeid=0
        }, time)
      
    }
    
  }