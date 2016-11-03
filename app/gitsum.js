import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import App from 'components/app'
import Main from 'views/main'
import Login from 'views/login'
import Admin from 'views/admin'
import Profile from 'views/admin/profile/index.js'
import RepositoryList from 'components/repository-list'
import GithubAuth from 'views/github/auth'
import store, { history } from './store'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route component={Main}>
          <IndexRoute component={RepositoryList} />
          <Route path="profile" component={Profile} />
        </Route>
        <Route path="login" component={Login} />
        <Route path="admin" component={Admin} />
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'))
