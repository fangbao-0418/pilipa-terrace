/// <reference path='../global-plugin.d.ts' />
import Config from '../config'
import filters from './filters'
import ajax, { RequestConfig, RequestTypeProps, XHRConfigProps } from '../ajax'

let ajaxCount = 0
/** 跳过loading */
function isPass (options: RequestConfig) {
  const { url, type } = options
  const index = filters.loading.findIndex((test) => {
    const match = test.match(/^(post|get)::/)
    let matchType: string = type
    if (match) {
      matchType = match[1]
      test = test.substr(match[0].length)
    }
    const pattern = new RegExp(test)
    if (pattern.test(url) && type.toUpperCase() === matchType.toUpperCase()) {
      return true
    }
  })
  return index > -1 ? true : false
}
/** ajax请求前拦截 */
ajax.interceptors.request.use((x, ev, settings) => {
  if (!isPass(settings)) {
    ajaxCount += 1
    if (ajaxCount > 0 && !document.querySelector('.pilipa-loading')) {
      Config.loading.show()
    }
  }
})
/** ajax响应后拦截 */
ajax.interceptors.response.use((response) => {
  /** 是否跳过loading */
  if (!isPass(response.config)) {
    ajaxCount -= 1
    if (ajaxCount <= 0) {
      Config.loading.hide()
    }
  }
  const { result, status } = response
  /** 401退出 */
  if (status === 401 || status === 200 && result.status === 401) {
    if (Config.env === 'production') {
      window.location.href = '/logout'
    } else {
      Config.history('/logout')
    }
    return response
  }
  if (status !== 200 || status === 200 && result.status !== 200) {
    let pass = true
    const url = response.config.url
    /** 过滤错误提示 */
    filters.error.map((pattern) => {
      if (new RegExp(pattern).test(url)) {
        pass = false
      }
    })
    /** 错误提示 */
    if (result.errors instanceof Array && pass) {
      const message: string[] = []
      result.errors.forEach((item: {message: string, code: string}) => {
        message.push(item.message)
      })
      Config.warning(message.join('，'))
    } else if (result.status && result.message) {
      Config.warning(result.message)
      response.status = result.status
    }
  }
  if (response.type === 'timeout') {
    Config.error('系统请求超时！')
  }
  return response
})

const http = <T = any>(url: string, type: XHRConfigProps | RequestTypeProps = 'GET', config?: XHRConfigProps): Promise<T> => {
  url = /^https?/.test(url) ? url : '/sys' + url
  let finalConfig: XHRConfigProps = {}
  if (typeof type !== 'string') {
    config = null
    config = type
    type = ((config as any).type || 'GET') as RequestTypeProps
  }
  if (config instanceof Array) {
    finalConfig.data = config
  } else {
    finalConfig = config || {}
  }
  finalConfig.headers = Object.assign({}, {
    token: Config.token,
    from: '4'
  }, finalConfig.headers)
  return ajax<T>(url, type, finalConfig).then((response) => {
    const { result } = response
    return result
  }, (err) => {
    return Promise.reject(err)
  })
}
export default http
