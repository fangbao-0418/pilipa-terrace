import Config from '../config'
import filters from './filters'
import xhr, { interceptors, XHRConfigProps, Data } from './xhr'
export interface AjaxConfigProps extends JQuery.AjaxSettings {
  type?: RequestTypeProps
  raw?: boolean
  extension?: JQuery.AjaxSettings
  [field: string]: any
}
type RequestTypeProps = 'GET' | 'POST' | 'DELETE' | 'PUT'
function handleError (err: JQuery.jqXHR) {
  let res = {}
  const { responseJSON, responseText } = err
  try {
    res = responseJSON || JSON.parse(responseText)
  } catch (e) {
  }
  return res
}

// $(document).ajaxError((event, response, settings) => {
//   const err: any = handleError(response) || {}
//   err.message = err.message || err.errMsg
//   if (response.status === 401) {
//     if (Config.env === 'production') {
//       window.location.href = '/logout'
//     } else {
//       Config.history('/logout')
//     }
//   }
// })

interceptors.request.use((xhr: any, e: any, settings: any) => {
  console.log(settings, new Date().getTime(), 'request')
  // e.abort()
  return e
})
interceptors.response.use((e: any) => {
  console.log(e, 'response')
  return e
})
const http = (url: string, type: XHRConfigProps | RequestTypeProps = 'GET', config?: XHRConfigProps) => {
  url = '/sys/v2/' + url
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
    token: '24d64163-1804-44db-9723-70ae419a5eef',
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
