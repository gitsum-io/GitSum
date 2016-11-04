import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import App from 'components/app'
import Main from 'views/main'
import Login from 'views/login'
import Admin from 'views/admin'
import Profile from 'views/admin/profile'
import RepositoriesAdmin from 'views/admin/repositories'
import RepositoryList from 'components/repository-list'
import NotFound from 'views/not-found'
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
        </Route>
        <Route path="login" component={Login} />
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'))
