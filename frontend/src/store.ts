

import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore,combineReducers,applyMiddleware   } from 'redux'
import thunk from 'redux-thunk'
import paginationReducer from './reducers/pagination'

const reducer = combineReducers({
    pagination: paginationReducer,
  })

const store = createStore( reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store