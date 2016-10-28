import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import globals from './globals'
import repositories from './repositories'
import user from './user'
import { authStateReducer } from 'redux-auth'

// Combined application reducer
export default combineReducers({
  globals,
  repositories,
  user,
  auth: authStateReducer,
  routing: routerReducer
})
