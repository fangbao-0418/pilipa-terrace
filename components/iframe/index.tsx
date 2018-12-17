import React from 'react'
import Main from './Main'
import Login from '../login'
import Logout from '../logout'
import { UserProps } from './ContextType'
import { withRouter, RouteComponentProps } from 'react-router'
import {
  Switch,
  Route
} from 'react-router-dom'
import Config, { TypeProps, MenuItem } from '../config'
interface Props extends RouteComponentProps<{}> {
  env?: 'development' | 'production'
  token?: string
  onChange?: (user?: UserProps) => void
  type?: TypeProps
  defaultValue?: UserProps
  config?: {
    menu: MenuItem[],
    logo: string
  }
}
class Index extends React.Component<Props> {
  public componentWillMount () {
    Config.env = this.props.env === undefined ? 'development' : this.props.env
    const token = this.props.token || Config.token
    const config = Object.assign({}, {
      menu: [],
      logo: ''
    }, this.props.config)
    Config.token = token
    Config.menu = config.menu
    Config.logo = config.logo
    Config.type = this.props.type
    if (Config.env === 'development') {
      Config.history = this.props.history.push
    }
    if (!token && this.props.location.pathname !== '/login') {
      this.history('/login')
    }
  }
  public history (url: string) {
    if (Config.env === 'production') {
      window.location.href = url
    } else {
      Config.history(url)
    }
  }
  public render () {
    return (
      this.props.env === 'production' ? (
        <Switch>
          {Config.token && <Main {...this.props}/>}
        </Switch>
      ) : (
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          {Config.token && <Main {...this.props}/>}
        </Switch>
      )
    )
  }
}
export default withRouter(Index)
