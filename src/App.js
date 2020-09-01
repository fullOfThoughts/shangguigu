import React from 'react'
import { connect } from 'react-redux'
import { mainRouter } from './router'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
@connect((state) => ({ user: state.user }))
class App extends React.Component {
  state = {}

  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/admin" to="/admin/home" />
          {mainRouter.map((item) => {
            return (
              <Route
                key={item.pathname}
                exact={item.exact}
                path={item.pathname}
                component={item.component}
              />
            )
          })}

          <Redirect exact from="/" to="/admin/home" />

          <Redirect to="/404" />
        </Switch>
      </Router>
    )
  }
}
export default App
