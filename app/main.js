// React
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Redux
import appReducer from './reducers/index'
import { setName } from './actions'

// Components
import Main from './components/main/main'
import RepositoryList from './components/repository-list/repository-list'
import Repository from './components/repository/repository'

// Styles
import styles from './styles.css'

// Create store from root reducer
let store = createStore(appReducer, window.devToolsExtension && window.devToolsExtension());

// Route tree
const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={RepositoryList}></IndexRoute>
      <Route path="/view/:repositoryId" component={Repository}></Route>
    </Route>
  </Router>
)

// Render app
render(router, document.getElementById('root'))
