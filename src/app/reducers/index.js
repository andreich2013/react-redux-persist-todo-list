import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import offerReducer from './offers'

export default combineReducers({
  router: routerReducer,
  offer: offerReducer
});