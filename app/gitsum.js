import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import App from 'components/app'
import Main from 'views/main'
import Login from 'views/login'
import Admin from 'views/admin'
import Auth from 'views/auth'
import Profile from 'views/admin/profile'
import RepositoriesAdmin from 'views/admin/repositories'
import RepositoryList from 'components/repository-list'
import GithubAuth from 'views/auth/github'
import store, { history } from './store'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route component={Main}>
          <IndexRoute component={RepositoryList} />
          <Route path="admin" component={Admin}>
            <Route path="profile" component={Profile} />
            <Route path="repositories" component={RepositoriesAdmin} />
          </Route>
          <Route path="auth" component={Auth}>
            <Route path="github" component={GithubAuth} />
          </Route>
        </Route>
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'))
