import { OPENMODAL } from '../action-types'
const initModalState = {
  open: false,
  record: {},
}
export default (state = initModalState, action) => {
  switch (action.type) {
    case OPENMODAL:
      const modalState = !state.open
      return { open: modalState, record: action.data }
    default:
      return state
  }
}
