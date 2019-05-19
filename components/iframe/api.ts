import http from '../http'
import xhr from '../http/xhr'
import Config, { MenuItem } from '../config'
export function hasPermission (key: string, codes: string[]) {
  if (key !== undefined) {
    if (codes.indexOf(key) > -1) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}
function handelMenuData (menu: MenuItem[], codes: string[]) {
  const res: MenuItem[] = []
  menu.forEach((item) => {
    item.hidden = !hasPermission(item.code, codes)
    if (item.children) {
      handelMenuData(item.children, codes)
    }
    res.push(item)
  })
  return res
}
// 获取菜单
export const fetchConfig = () => {
  return xhr(`/json/config.json?v=${new Date().getTime()}`)
}
export const fetchUserInfo = () => {
  return Promise.all([
    http(`/user/v1/api/user/info?token=${Config.token}`),
    fetchPermissionCode(),
    fetchConfig()
  ]).then(([res, res2, res3]) => {
    const config = res3.result
    res.codes = res2
    Config.menu = handelMenuData(config.menu, res2)
    Config.logo = config.logo
    Config.user = res
    return res
  })
}

export const fetchPermissionCode = () => {
  return http(`/user/v1/api/authority/code?token=${Config.token}`)
}
