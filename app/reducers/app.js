import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import global from './global'
import repositories from './repositories'

// Combined application reducer
export default combineReducers({
  global,
  repositories,
  routing: routerReducer
})
