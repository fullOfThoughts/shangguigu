import { LOGIN, OPENMODAL } from '../action-types'
export const firstLogin = () => ({ type: LOGIN })
export const openModal = (record) => ({ type: OPENMODAL, data: record })
