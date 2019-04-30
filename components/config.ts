import Pa from 'pilipa-analytics'
import { UserProps } from './iframe/ContextType'
import cookie from './cookie'
export type TypeProps = string
export interface MenuItem {
  title: string
  path?: string
  code?: string
  mark?: string
  hidden?: boolean
  icon?: string
  children?: Array<MenuItem>
}
interface ConfigProps {
  pa: Pa
  from: string
  token: string
  user: UserProps
  mark: string
  env: 'development' | 'production'
  trackPageError: (params: object) => void
  history?: (url: string) => void
  type?: TypeProps
  logo?: string
  menu?: MenuItem[]
  localStorage?: any
}
const pa = new Pa('icrm', window.navigator.userAgent, {
  env: location.hostname === 'icrm.pilipa.cn' ? 'production' : 'development', // dev || production
  trigger: ['icrm.pilipa.cn', 'x-b.i-counting.cn', 'dev-b.i-counting.cn'].indexOf(location.hostname) > -1 // 是否发送请求
})
const config: ConfigProps = {
  from: '4',
  token: (window.localStorage ? localStorage.getItem('token') : undefined) || cookie.get('token') || undefined,
  user: undefined,
  mark: '',
  env: 'development',
  pa,
  trackPageError: (params) => {
    const user =  config.user || {}
    params = Object.assign({
      token: config.token,
      username: user.username,
      phone: user.phone,
      companyId: user.companyId,
      companyName: user.companyName,
      userType: user.userType,
      regionCompanyType: user.regionCompanyType
    }, params)
    pa.trackEvent({
      labelId: 'page-error',
      eventId: 'error',
      params
    })
  },
  history: (url) => {
    window.location.href = url
  },
  logo: '',
  menu: [],
  localStorage: {
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value)
      const time = new Date().getTime() + 30 * 24 * 3600 * 1000
      cookie.set({
        [key]: value
      }, {
        expires: new Date(time)
      })
    },
    getItem: (key: string) => {
      return localStorage.getItem(key) || cookie.get(key)
    }
  }
}
export default config
