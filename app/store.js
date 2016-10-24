import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

// App combined reducer
import appReducer from './reducers/app'

// Log actions
const loggerMiddleware = createLogger()

// Set state defaults
const defaultState = {
  globals: {
    addFormActive: false,
    name: 'GitSum'
  },
  repositories: []
}

// Store creation

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  appReducer,
  defaultState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
  // window.devToolsExtension && window.devToolsExtension(),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// React router and redux connection
export const history = syncHistoryWithStore(browserHistory, store)

export default store
