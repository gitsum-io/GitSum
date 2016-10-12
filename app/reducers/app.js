import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import globals from './globals'
import repositories from './repositories'

// Combined application reducer
export default combineReducers({
  globals,
  repositories,
  routing: routerReducer
})
