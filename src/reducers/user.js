import { LOGIN } from '../action-types'

const userInfo =
  JSON.parse(window.localStorage.getItem('user')) ||
  JSON.parse(window.sessionStorage.getItem('user'))
const initUser = {
  ...userInfo,
}
export default (state = initUser, action) => {
  switch (action.type) {
    case LOGIN:
      let userInfo =
        JSON.parse(window.localStorage.getItem('user')) ||
        JSON.parse(window.sessionStorage.getItem('user'))
      return { ...userInfo }
    default:
      return { ...state }
  }
}
