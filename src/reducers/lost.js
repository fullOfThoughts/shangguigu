import { GETLOST } from '../action-types'
const initLost = null
export default (state = initLost, action) => {
  switch (action.type) {
    case GETLOST:
      return action.data
    default:
      return state
  }
}
