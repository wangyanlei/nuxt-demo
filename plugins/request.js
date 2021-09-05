/**
 * 基于 axios 封装的请求模块
 */

 import axios from 'axios'

 export const request = axios.create({
  //  baseURL: 'https://conduit.productionready.io'
   baseURL: 'http://realworld.api.fed.lagounews.com'
 })
 
//  通过插件机制获取到上下文对象
// 插件导出函数必须作为 default 成员
 export default ({ store }) => {
   request.interceptors.request.use(function (config) {
     const { user } = store.state

     if (user && user.token) {
       config.headers.Authorization = `Token ${user.token}`
     }
     return config
   }, function (error) {
     return Promise.reject(error)
   })
 }
 