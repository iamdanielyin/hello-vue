import axios from 'axios'
import { Message } from 'element-ui'
import _ from 'lodash'

/**
 * 请求发起时的错误处理
 * @param error
 */
function networkInterceptor (error) {
  console.error(`Before request: ${error}`)
  Promise.reject(error)
}

/**
 * 响应拦截
 * @param error
 * @returns {Promise<never>}
 */
function responseInterceptor (error) {
  console.error(`Network error: ${error}`)
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}

const instance = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 60 * 1000
})

// 请求拦截器
instance.interceptors.request.use(
  networkInterceptor
)

// 响应拦截器
instance.interceptors.response.use(
  res => {
    let data = null
    if (res.status >= 200 && res.status < 300) {
      const json = res.data
      if (json.errcode || json.errmsg) {
        if (json.errstack) {
          console.error(`API error: ${json.errstack}`)
        }
        Message({
          message: json.errmsg,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(json.errmsg)
      } else {
        data = _.result(json, 'data', json)
      }
    } else {
      Message({
        message: 'Network error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error('Network error'))
    }
    return data
  },
  responseInterceptor
)

/**
 * 下载实例
 * @type {AxiosInstance}
 */
export const download = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 60 * 60 * 1000,
  responseType: 'blob'
})

// 请求拦截器
download.interceptors.request.use(
  networkInterceptor
)

// 请求拦截器
download.interceptors.response.use(
  res => {
    const blob = new Blob([res.data])
    let filename = null
    if (res.config['__filename']) {
      filename = res.config['__filename']
    } else {
      filename = window.decodeURIComponent(new RegExp('filename="(.*)"').exec(res.headers['content-disposition'])[1])
    }
    console.info('download', filename)
    const eleLink = document.createElement('a')
    eleLink.download = filename
    eleLink.style.display = 'none'
    // 字符内容转变成blob地址
    eleLink.href = URL.createObjectURL(blob)
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
  },
  responseInterceptor
)

export default instance
