import Config from '../config'
import filters from './filters'
import xhr, { RequestTypeProps, XHRConfigProps } from './xhr'

xhr.interceptors.request.use((x, ev, settings) => {
  console.log(settings, new Date().getTime(), 'request')
})
xhr.interceptors.response.use((response) => {
  // const err: any = handleError(response) || {}
  // err.message = err.message || err.errMsg
  // if (response.status === 401) {
  //   if (Config.env === 'production') {
  //     window.location.href = '/logout'
  //   } else {
  //     Config.history('/logout')
  //   }
  // }
  return response
})

const http = (url: string, type: XHRConfigProps | RequestTypeProps = 'GET', config?: XHRConfigProps) => {
  url = '/sys' + url
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
    token: 'c8c6d25b-3f2c-4883-9da3-964884b1a9b3',
    from: '4'
  }, finalConfig.headers)
  return xhr(url, type, finalConfig).then((response) => {
    const { result } = response
    if (result.status && result.status !== 200) {
      if (result.status === 401) {
        Config.history('/logout')
      }
      if (result.message) {
        let pass = true
        filters.errorPrompt.map((pattern) => {
          if (new RegExp(pattern).test(url)) {
            pass = false
          }
        })
        if (pass) {
          // APP.error(result.message)
        }
      }
      return Promise.reject(result)
    }
    return result
  }, (err) => {
    Promise.reject(err)
  })
}
export default http
