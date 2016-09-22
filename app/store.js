import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, compse, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

import appReducer from './reducers/app'

const loggerMiddleware = createLogger()

const defaultState = {
  global: {
    name: 'GitSum'
  },
  repositories: []
}

const store = createStore(
  appReducer,
  defaultState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ),
  window.devToolsExtension && window.devToolsExtension()
)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
