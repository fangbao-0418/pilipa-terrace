import React from 'react'
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
