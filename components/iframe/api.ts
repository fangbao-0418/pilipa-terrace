import http from '../http'
import Config from '../config'
export const fetchUserInfo = () => {
  return Promise.all([
    http(`/user/v1/api/user/info?token=${Config.token}`),
    fetchPermissionCode()
  ]).then(([res, res2]) => {
    res.codes = res2
    Config.user = res
    return res
  })
}

export const fetchPermissionCode = () => {
  return http(`/user/v1/api/authority/code?token=${Config.token}`)
}
