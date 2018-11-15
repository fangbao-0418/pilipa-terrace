import React from 'react'
import { MenuItem } from '../config'
export interface UserProps {
  companyName?: string
  // email: string
  // phone: string
  username?: string
  companyId?: string
  /** 城市编码 */
  cityCode?: string
  city?: string
  codes?: string[]
  menu?: MenuItem[]
}
export interface ValueProps {
  user: UserProps,
  onChange?: (value?: ValueProps) => void
}
const defaultValue: ValueProps = {
  user: {}
}
const ContextType = React.createContext(defaultValue)
export default ContextType
