import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import global from './global'
import repositories from './repositories'

export default combineReducers({ 
    global,
    repositories,
    router: routerReducer
})
