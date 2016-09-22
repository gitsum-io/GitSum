import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, compse, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

// App combined reducer
import appReducer from './reducers/app'

// Log actions
const loggerMiddleware = createLogger()

// Set state defaults
const defaultState = {
  global: {
    name: 'GitSum'
  }
}

// Store creation
const store = createStore(
  appReducer,
  defaultState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ),
  window.devToolsExtension && window.devToolsExtension()
)

// React router and redux connection
export const history = syncHistoryWithStore(browserHistory, store)

export default store
