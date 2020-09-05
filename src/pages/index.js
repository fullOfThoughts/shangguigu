import Loadable from 'react-loadable'
import { Loading } from '../components'

//  路由懒加载处理
export const Admin = Loadable({
  loader: () => import('./Admin'),
  loading: Loading,
})
export const Category = Loadable({
  loader: () => import('./Category'),
  loading: Loading,
})
export const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
})
export const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
})
export const Product = Loadable({
  loader: () => import('./Product'),
  loading: Loading,
})
export const Roles = Loadable({
  loader: () => import('./Roles'),
  loading: Loading,
})
export const Users = Loadable({
  loader: () => import('./Users'),
  loading: Loading,
})

export const Bar = Loadable({
  loader: () => import('./Bar'),
  loading: Loading,
})
export const Line = Loadable({
  loader: () => import('./Line'),
  loading: Loading,
})
export const Pie = Loadable({
  loader: () => import('./Pie'),
  loading: Loading,
})

export const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
})
export const No = Loadable({
  loader: () => import('./No'),
  loading: Loading,
})
