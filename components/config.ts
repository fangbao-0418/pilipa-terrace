import { UserProps } from './iframe/ContextType'
export type TypeProps = 'workorder' | 'legwork' | 'premission' | 'crm' | 'message' | 'operate-log' | 'configure'
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
  token: localStorage.getItem('token'),
  user: undefined,
  mark: '',
  env: 'development',
  history: (url) => {
    window.location.href = url
  }
}
export default config
