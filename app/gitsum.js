// React dependencies
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

// Components
import App from 'components/app'
import Main from 'views/main/main'
import Login from 'views/login/login'

// Store
import store, { history } from './store'

// Styles
import styles from './styles.css'

// Route tree
const router = (
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="/login" component={Login} />
        </Route>
      </Router>
  </Provider>
)

// Render app
render(router, document.getElementById('root'))
