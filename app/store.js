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
  repositories: [],
  user: {
    name: 'Ash Brock',
    email: 'hello@ashbrock.com',
    avatar: 'http://digital360.com.au/assets/Uploads/team/ash-brock.jpg',
  }
}

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
)

// React router and redux connection
export const history = syncHistoryWithStore(browserHistory, store)

export default store
