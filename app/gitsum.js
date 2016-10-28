import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import App from 'components/app'
import Main from 'views/main'
import Login from 'views/login'
import Admin from 'views/admin'
import Profile from 'views/admin/profile/index.js'
import Repositories from 'views/admin/repositories/index.js'
import store, { history } from './store'

const router = (
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin}>
            <IndexRoute component={Profile} />
            <Route path="/profile" component={Profile} />
            <Route path="/repositories" component={Repositories} />
          </Route>
          <Route path="/github/auth" component={Profile} />
        </Route>
      </Router>
  </Provider>
)

render(router, document.getElementById('root'))
