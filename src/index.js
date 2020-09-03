import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import './assets/index.less'
import { Provider } from 'react-redux'
import store from './store'

window.p = []
window._clearRequest = () => {
  if (window.p.length > 0) {
    window.p.forEach((item) => {
      item()
    })
  }
  window.p = []
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
