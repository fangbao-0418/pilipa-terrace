import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { userLogout } from '../api'
import Config from '../config'
import cookie from '../cookie'
type Props = RouteComponentProps<{}>
class Main extends React.Component<Props> {
  public componentWillMount () {
    userLogout()
    Config.token = ''
    Config.user = undefined
    localStorage.clear()
    sessionStorage.clear()
    cookie.removeAll()
    Config.history('/login')
  }
  public render () {
    return (
      <div></div>
    )
  }
}
export default withRouter(Main)
