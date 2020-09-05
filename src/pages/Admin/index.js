import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { adminRouter } from '../../router'
import { connect } from 'react-redux'
import { Frame } from '../../components'

@connect((state) => ({ user: state.user }))
class Admin extends React.Component {
  state = {}
  render() {
    if (!this.props.user.id) {
      return <Redirect to="/login" />
    }
    return (
      <Frame>
        <Switch>
          {adminRouter.map((item) => {
            return (
              <Route
                key={item.pathname}
                exact={item.exact}
                path={item.pathname}
                component={item.component}
              />
            )
          })}
          {adminRouter[2].children.map((item) => {
            return (
              <Route
                key={item.pathname}
                exact={item.exact}
                path={item.pathname}
                component={item.component}
              />
            )
          })}

          <Redirect to="/admin/404" />
        </Switch>
      </Frame>
    )
  }
}
export default Admin
