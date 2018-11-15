import { UserProps } from './iframe/ContextType'
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
}
const config: ConfigProps = {
  from: '',
  token: localStorage.getItem('token') || undefined,
  user: undefined,
  mark: '',
  env: 'development',
  history: (url) => {
    window.location.href = url
  }
}
export default config
