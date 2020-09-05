import {
  Admin,
  Category,
  Home,
  Login,
  Roles,
  Product,
  Users,
  NotFound,
  Bar,
  Line,
  Pie,
  No,
} from '../pages'
import { ProductAdd, ProductDetail } from '../pages/Product/router'

export const mainRouter = [
  {
    pathname: '/admin',
    component: Admin,
  },

  {
    pathname: '/login',
    component: Login,
    exact: true,
  },
  {
    exact: true,
    pathname: '/404',
    component: NotFound,
  },
]

export const adminRouter = [
  {
    pathname: '/admin/home',
    component: Home,
    exact: true,
  },
  {
    pathname: '/admin/category',
    component: Category,
    exact: true,
  },
  {
    pathname: '/admin/product',
    component: Product,
    exact: true,
    children: [
      {
        pathname: '/admin/product/add',
        component: ProductAdd,
        exact: true,
      },
      {
        pathname: '/admin/product/detail',
        component: ProductDetail,
        exact: true,
      },
    ],
  },
  {
    pathname: '/admin/roles',
    component: Roles,
    exact: true,
  },
  {
    pathname: '/admin/user',
    component: Users,
    exact: true,
  },
  {
    pathname: '/admin/bar',
    component: Bar,
    exact: true,
  },
  {
    pathname: '/admin/line',
    component: Line,
    exact: true,
  },
  {
    pathname: '/admin/pie',
    component: Pie,
    exact: true,
  },
  {
    pathname: '/admin/404',
    component: No,
    exact: false,
  },
]
