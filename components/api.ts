import $ from 'jquery'
import http from './http'
import Config from './config'
function getUaaInfo () {
  let url = 'https://x-id.i-counting.cn'
  let clientId = 'aZGUqxTga0BIHUW5'
  if (window.location.hostname === 'icrm.pilipa.cn') {
    url = 'https://id.i-counting.cn'
    clientId = 'rtnsJtnT5Lu3cdmN'
  }
  return {
    url,
    clientId
  }
}
export const queryToObject = (querystring: string) => {
  const arr = querystring.split('&')
  const obj: any = {}
  arr.map((item) => {
    const res = item.split('=') || []
    if (res[0]) {
      obj[res[0]] = res[1]
    }
  })
  return obj
}
// 用户登陆
export const userLogin = (payload: {
  phone: string,
  validCode?: string
}) => {
  return http(`/user/v1/api/login`, 'POST', {
    data: payload
  })
}

// 获取短信验证码
export const fetchSmsVerifyCode = (phone: string) => {
  return http(`/user/v1/api/short/message/send`, 'GET', {
    phone
  })
}
// 绑定公司
export const bindCompany = (payload: {token: string, companyId: string}) => {
  return http(`/user/v1/api/user/company/bind`, 'POST', payload)
}
// 获取公司列表
export const companylist = (token: string) => {
  return http(`/user/v1/api/user/company/list?token=${token}`).then((res) => {
    return res
  }, (err) => {
    Config.history('/logout')
    return err
  })
}
// 退出
export const userLogout = () => {
  return http(`/user/v1/api/logout`, 'POST', {
    // token: APP.token
  })
}
// uaa获取token
export const fetchUaaLoginUrl = (path: string = '') => {
  const CLIENT_ID = getUaaInfo().clientId
  const ENV = Config.env
  const $REDIRECT = `${window.location.origin}/token`
  // if (ENV === 'development') {
  //   $REDIRECT = `${window.location.origin}/#/token`
  // }
  const UAA_SERVER_URL = getUaaInfo().url
  return `${UAA_SERVER_URL}${path}?response_type=code&client_id=${CLIENT_ID}&scope=&redirect_uri=${$REDIRECT}`
}
// 获取token
export const fetchToken = (code: string) => {
  const uri = `${window.location.origin}/token`
  return $.ajax({
    url: `/sys/user/v1/api/oauth2/token?code=${code}&redirectURI=${uri}`,
    headers: {
      from: '4'
    }
  })
}
// uaa注销
export const uaaLogout = () => {
  const UAA_SERVER_URL = getUaaInfo().url
  return $.ajax({
    url: `${UAA_SERVER_URL}/ua/logout`,
    xhrFields: {
      withCredentials: true
    }
  })
}
