import React from 'react'
import NoPage from './404'
import NoAccess from './NoAccess'
interface Props {
  type?: 'no-page' | 'no-access'
}
const Pages = {
  'no-page': NoPage,
  'no-access': NoAccess
}
class Main extends React.Component<Props> {
  public static NoPage = NoPage
  public static NoAccess = NoAccess
  public render () {
    const type = this.props.type || 'no-page'
    const C = Pages[type]
    return (
      <C />
    )
  }
}
export default Main
