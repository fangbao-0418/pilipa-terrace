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
  from: string
  token: string
  user: UserProps
  mark: string
  env: 'development' | 'production'
  history?: (url: string) => void
  type?: TypeProps
  logo?: string
  menu?: MenuItem[]
  localStorage?: any
}
const config: ConfigProps = {
  from: '4',
  token: (window.localStorage ? localStorage.getItem('token') : undefined) || cookie.get('token') || undefined,
  user: undefined,
  mark: '',
  env: 'development',
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
