import { LOGIN, OPENMODAL, GETDETAIL } from '../action-types'
export const firstLogin = () => ({ type: LOGIN })
export const openModal = (record) => ({ type: OPENMODAL, data: record })
export const getDetail = (record) => ({ type: GETDETAIL, data: record })
