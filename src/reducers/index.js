import { combineReducers } from 'redux'
import user from './user'
import Modal from './modal'
import productDetail from './product'
export default combineReducers({
  user,
  Modal,
  productDetail,
})
