/**
 * 基础服务类
 */
import http from '../../http'
import _ from 'lodash'

class Service {
  public static http = http
  constructor () {
  }

  public createUrl (url: string = '', set: any = {}) {
    set = set || {}
    const u = url
    const a = u.split('?')
    const args = a.length > 1 ? a[1].split('&') : []
    const od: any = {}
    const nd: any = set
    let r = ''
    for (const i of args) {
    }
    _.forEach(args, (item: any, i: any) => {
      od[args[i].split('=')[0]] = args[i].split('=')[1]
    })
    _.forEach(nd, (item: any, i: any) => {
      od[i] = nd[i]
    })
    _.forEach(od, (item: any, i: any) => {
      r += od[i] ? (i + '=' + od[i] + '&') : ''
    })
    return r ? (a[0] + '?' + r).replace(/&$/ig, '') : a[0]
  }
}
export default Service
