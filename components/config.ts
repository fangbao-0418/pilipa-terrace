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
}
const config: ConfigProps = {
  from: '',
  token: localStorage.getItem('token') || cookie.get('token') || undefined,
  user: undefined,
  mark: '',
  env: 'development',
  history: (url) => {
    window.location.href = url
  },
  logo: '',
  menu: []
}
export default config
