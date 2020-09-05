import {
  LOGIN,
  OPENMODAL,
  GETDETAIL,
  TREEVISIBLE,
  GETLOST,
} from '../action-types'
export const firstLogin = () => ({ type: LOGIN })
export const openModal = (record) => ({ type: OPENMODAL, data: record })
export const getDetail = (record) => ({ type: GETDETAIL, data: record })
export const treevisible = () => ({ type: TREEVISIBLE })
export const getLost = (func) => ({ type: GETLOST, data: func })
