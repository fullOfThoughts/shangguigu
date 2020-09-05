import { combineReducers } from 'redux'
import user from './user'
import Modal from './modal'
import productDetail from './product'
import tree from './tree'
import lost from './lost'
export default combineReducers({
  user,
  Modal,
  productDetail,
  tree,
  lost,
})
