import http from './http'
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
  return http(`/user/v1/api/user/company/list?token=${token}`)
}
// 退出
export const userLogout = () => {
  return http(`/user/v1/api/logout`, 'POST', {
    // token: APP.token
  })
}
