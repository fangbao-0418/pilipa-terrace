import http from '../http'
import Config, { MenuItem } from '../config'
import { fetchMenu } from '../api'
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
export const fetchUserInfo = () => {
  return Promise.all([
    http(`/user/v1/api/user/info?token=${Config.token}`),
    fetchPermissionCode(),
    fetchMenu()
  ]).then(([res, res2, res3]) => {
    res.codes = res2
    res.menu = handelMenuData(res3, res2)
    console.log(res.menu, 'res3', 'menu')
    Config.user = res
    return res
  })
}

export const fetchPermissionCode = () => {
  return http(`/user/v1/api/authority/code?token=${Config.token}`)
}
