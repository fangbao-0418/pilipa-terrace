export interface CurrentTarget {
  status: number
  statusText: string
  response: string
}
export type Body = string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams
export type Data = Body | object | any[]
export type XHRConfigProps = {
  type?: RequestTypeProps
  timeout?: number
  withCredentials?: boolean
  data?: Data
  processData?: boolean
  /** request content-type */
  contentType?: any
  [field: string]: any
} | any[]
type RequestTypeProps = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTION' | 'HEAD'

export interface RequestConfig {
  url: string
  type: RequestTypeProps
  timeout: number
  withCredentials: boolean
  headers: object
  body: Body
}
export interface ResponseProps {
  type: 'load' | 'timeout' | 'error'
  /** http 状态码 */
  status: number
  statusText: string
  /** 请求返回的结果 */
  result: any
  /** request配置信息 */
  config: RequestConfig
}
export function parse (data: string) {
  let result = null
  try {
    result = JSON.parse(data)
  } catch (e) {
    result = data
  }
  return result
}
export function param (obj: any) {
  const arr = []
  for (const key in obj) {
    if (key in obj) {
      arr.push(`${key}=${obj[key]}`)
    }
  }
  return arr.join('&')
}

export function parseQuerystring (str: string) {
  const arr = str.split('&')
  const obj: any = {}
  arr.map((item) => {
    const res = item.match(/^(.+?)=(.*)$/)
    if (res) {
      obj[res[1]] = res[2]
    }
  })
  return obj
}

function optimizeData (data: Data) {
  if (!data) {
    return null
  }
  if (data instanceof Object) {
    ['type', 'processData', 'withCredentials', 'headers'].map((key) => {
      delete (data as any)[key]
    })
  }
  if (JSON.stringify(data) === '{}') {
    data = null
  }
  return data
}

/** 合成url */
export function composeURL (url: string, data: object) {
  if (!data) {
    return url
  }
  const arr = url.match(/^(.+?)\?(.+)$/)
  if (arr && arr.length === 3) {
    const pathname = arr[1]
    const search = param(Object.assign({}, parseQuerystring(arr[2]), data))
    return pathname + '?' + search
  } else if (arr === null) {
    const pathname = url
    const search = param(data)
    return pathname + '?' + search
  } else {
    throw new Error('the ' + url + ', is not a valid url')
  }
}

interface Interceptor {
  request: {
    readonly success: any
    readonly error: any
    use: (success: any) => void
  }
  response: {
    readonly success: any
    readonly error: any
    use: (success: any, error?: (response: any) => any) => void
  }
}

export const interceptors: Interceptor = {
  request: {
    success: undefined,
    error: undefined,
    use (success) {
      this.success = success
    }
  },
  response: {
    success: undefined,
    error: undefined,
    use (success, error) {
      this.success = success
      this.error = error
    }
  }
}

function http (url: string, type: XHRConfigProps | RequestTypeProps = 'GET', config?: XHRConfigProps): Promise<ResponseProps> {
  const xhr = new XMLHttpRequest()
  let finalConfig: XHRConfigProps = {}
  let data: Data

  if (typeof type !== 'string') {
    config = null
    config = type
    type = ((config as any).type || 'GET') as RequestTypeProps
  }
  if (config instanceof Array) {
    data = config
    finalConfig = {}
  } else {
    finalConfig = config || {}
    data = config && config.data || config
  }
  const processData = finalConfig.processData !== undefined ? finalConfig.processData : true
  const headers = finalConfig.headers
  const contentType =  headers['Content-Type'] !== undefined ? headers['Content-Type'] : finalConfig.contentType
  headers['Content-Type'] = contentType === false ? undefined : (contentType || 'application/json; charset=utf-8')

  data = optimizeData(data) as Body
  if (type === 'GET' && data instanceof Object) {
    url = composeURL(url, data as object)
    data = null
  }
  xhr.open(type, url, true)
  xhr.timeout = finalConfig.timeout || 10000
  xhr.withCredentials = finalConfig.withCredentials || false
  for (const key in headers) {
    if (key in headers && headers[key] !== undefined) {
      xhr.setRequestHeader(key, headers[key])
    }
  }
  const body = (processData ? data && JSON.stringify(data) : data) as Body
  const settings: RequestConfig = {
    url,
    type,
    timeout: xhr.timeout,
    withCredentials: xhr.withCredentials,
    headers,
    body
  }
  const p = new Promise<ResponseProps>((resolve, reject: (error: ResponseProps) => void) => {
    xhr.onloadstart = (e: ProgressEvent) => {
      if (interceptors.request.success) {
        interceptors.request.success(xhr, e, settings)
      }
    }
    xhr.onload = (e: ProgressEvent) => {
      const currentTarget = e.currentTarget as any as CurrentTarget
      const status = currentTarget.status
      const result = parse(currentTarget.response)
      let response: ResponseProps = ({
        type: e.type as any,
        status: currentTarget.status,
        statusText: currentTarget.statusText,
        result,
        config: settings
      })
      if (interceptors.response.success) {
        response = interceptors.response.success(response)
      }
      if (status === 200) {
        resolve (response)
      } else {
        reject(response)
      }
    }
    xhr.onerror = (e: ProgressEvent) => {
      const currentTarget = e.currentTarget as any as CurrentTarget
      let response: ResponseProps = {
        type: e.type as any,
        status: currentTarget.status,
        statusText: currentTarget.statusText,
        result: null,
        config: settings
      }
      if (interceptors.response.success) {
        response = interceptors.response.success(response)
      }
      reject(response)
    }
    xhr.ontimeout = (e: ProgressEvent) => {
      const currentTarget = e.currentTarget as any as CurrentTarget
      let response: ResponseProps = {
        type: e.type as any,
        status: currentTarget.status,
        statusText: currentTarget.statusText,
        result: null,
        config: settings
      }
      if (interceptors.response.success) {
        response = interceptors.response.success(response)
      }
      reject(response)
    }
    xhr.send(body || null)
  })
  return p
}
export default http
