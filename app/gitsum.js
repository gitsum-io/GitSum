// React dependencies
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Redux
import appReducer from './reducers/app'

// Components
import App from './components/app'
import RepositoryList from './components/repository-list/repository-list'

// Store
import store, { history } from './store'

// Styles
import styles from './styles.css'

// Route tree
const router = (
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={RepositoryList}></IndexRoute>
        </Route>
      </Router>
  </Provider>
)

// Render app
render(router, document.getElementById('root'))
