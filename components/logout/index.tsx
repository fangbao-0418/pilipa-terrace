import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { userLogout } from '../api'
import Config from '../config'
type Props = RouteComponentProps<{}>
class Main extends React.Component<Props> {
  public componentWillMount () {
    userLogout()
    Config.token = ''
    Config.user = undefined
    localStorage.clear()
    sessionStorage.clear()
    Config.history('/login')
  }
  public render () {
    return (
      <div></div>
    )
  }
}
export default withRouter(Main)
