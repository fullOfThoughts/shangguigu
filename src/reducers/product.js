import { GETDETAIL } from '../action-types'
const initDetail = {}
export default (state = initDetail, action) => {
  switch (action.type) {
    case GETDETAIL:
      return action.data
    default:
      return state
  }
}
