

import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore,combineReducers,applyMiddleware   } from 'redux'
import thunk from 'redux-thunk'
import paginationReducer from './reducers/pagination'
import messageReducer from './reducers/message'
import modalReducer from './reducers/modal'
import favoritesReducer from './reducers/favorites'
import alertsReducer from './reducers/alerts'

const reducer = combineReducers({
    pagination: paginationReducer,
    message: messageReducer,
    modal: modalReducer,
    favorites: favoritesReducer,
    alert:alertsReducer
  })

const store = createStore( reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store