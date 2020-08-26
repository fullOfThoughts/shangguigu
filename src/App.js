import React from 'react'

import Login from './pages/Login'
import Admin from './pages/Admin'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
export default class App extends React.Component {
  state = {}
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </Router>
    )
  }
}
