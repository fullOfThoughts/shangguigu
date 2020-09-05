import axios from 'axios'
import { message } from 'antd'
const CancelToken = axios.CancelToken
//  判断当前环境是否是开发环境
const isDev = process.env.NODE_ENV === 'development'
//  为不同的环境配置不同的前缀地址
const service = axios.create({
  baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/264254' : '',
  timeout: 3000, //  表示请求超时的时间
})
// 为每个请求设置一个拦截,这里先设置一下请求体
service.interceptors.request.use(
  (config) => {
    config.data = Object.assign({}, config.data)
    return config
  },
  //  处理请求错误
  (err) => {
    Promise.reject(err)
    message.error({ content: '请求失败', duration: 1 })
  }
)
//  为每一个响应进行一个拦截，
service.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data
  } else {
    message.error({ content: '响应失败', duration: 1 })
  }
})
//  登录请求
export const Reqlogin = (username, password) => {
  return service.post('/login', {
    username,
    password,
  })
}
//  获取分类列表
export const getCategory = () => {
  return service.post('/admin/category')
}
//  获取商品列表
export const getProductList = () => {
  return service.post('/admin/product')
}
//  获取商品分类
export const getProductCategory = () => {
  return service.post(
    '/admin/product/category',
    {},
    {
      cancelToken: new axios.CancelToken(function executor(c) {
        window.p.push(c)
      }),
    }
  )
}
//  获取授权信息
export const getRoles = () => {
  return service.post(
    '/admin/roles',
    {},
    {
      cancelToken: new CancelToken(function executor(c) {
        window.p.push(c)
      }),
    }
  )
}
//  获取管理员信息
export const getManage = () => {
  return service.post(
    '/admin/manage',
    {},
    {
      cancelToken: new CancelToken(function executer(c) {
        window.p.push(c)
      }),
    }
  )
}
