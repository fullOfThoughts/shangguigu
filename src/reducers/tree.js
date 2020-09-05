import { TREEVISIBLE } from '../action-types'
const initVisible = {
  visible: false,
}
export default (state = initVisible, action) => {
  switch (action.type) {
    case TREEVISIBLE:
      return { visible: !state.visible }
    default:
      return state
  }
}
