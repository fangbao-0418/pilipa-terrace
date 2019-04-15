import React from 'react'
import Main from './Main'
import Login from '../uaa/login'
import Logout from '../uaa/logout'
import Token from '../uaa/token'
import Bind from '../uaa/bind'
import { UserProps } from './ContextType'
import { withRouter, RouteComponentProps } from 'react-router'
import Pa from 'pilipa-analytics'
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
const pa = new Pa('icrm', window.navigator.userAgent, {
  env: 'production', // dev || production
  trigger: true // 是否发送请求
})
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
    this.trackPage()
    if (Config.env === 'development') {
      Config.history = this.props.history.push
    }
    if (!token && ['/login', '/token'].indexOf(this.props.location.pathname) === -1) {
      this.history('/login')
    }
  }
  public componentWillReceiveProps (props: Props) {
    const currentUrl = props.location.pathname + props.location.search + props.location.hash
    const oldUrl = this.props.location.pathname + this.props.location.search + this.props.location.hash
    if (currentUrl !== oldUrl) {
      this.trackPage()
    }
  }
  public trackPage () {
    let env: 'development' | 'production' = 'development'
    if (window.location.hostname === 'icrm.pilipa.cn') {
      env = 'production'
    }
    pa.setEnv(env)
    setTimeout(() => {
      // 页面追踪
      pa.trackPage({
        title: document.title,
        location: window.location.href,
        referer: document.referrer
      })
    }, 0)
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
          <Route path='/token' component={Token} />
          <Route path='/bind' component={Bind} />
          {Config.token && <Main {...this.props}/>}
        </Switch>
      )
    )
  }
}
export default withRouter(Index)
