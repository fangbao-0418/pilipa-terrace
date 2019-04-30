import React from 'react'
import Top from '../top'
import Left from '../left'
import Config from '../config'
import { getHomePage } from '../left/config'
import {
  Switch
} from 'react-router-dom'
import { Layout } from 'antd'
import { fetchUserInfo } from './api'
import { ValueProps, UserProps } from './ContextType'
import { withRouter, RouteComponentProps } from 'react-router'
const { Content } = Layout
interface Props extends RouteComponentProps {
  env?: 'development' | 'production'
  token?: string
  onChange?: (user?: UserProps) => void
  defaultValue?: UserProps
}
interface State {
  value: ValueProps
}
class Main extends React.Component<Props> {
  public state: State = {
    value: {
      user: this.props.defaultValue,
      onChange: this.onChange.bind(this)
    }
  }
  public componentDidMount () {
    this.fetchUser().then(() => {
      this.trackPage()
    })
  }
  public componentWillReceiveProps (props: Props) {
    const currentUrl = props.location.pathname + props.location.search + props.location.hash
    const oldUrl = this.props.location.pathname + this.props.location.search + this.props.location.hash
    if (currentUrl !== oldUrl) {
      this.trackPage()
    }
  }
  public trackPage () {
    setTimeout(() => {
      // 页面追踪
      const user = Config.user || {}
      Config.pa.trackEvent({
        labelId: 'page',
        eventId: 'pageview',
        params: {
          title: document.title,
          location: window.location.href,
          referer: document.referrer,
          username: user.username,
          companyId: user.companyId,
          companyName: user.companyName,
          phone: user.phone,
          userType: user.userType,
          regionCompanyType: user.regionCompanyType
        }
      })
    }, 0)
  }
  public onChange () {
    this.fetchUser().then(() => {
      const path = getHomePage().path
      if (Config.env === 'production') {
        window.location.href = path
      }
    })
  }
  public fetchUser () {
    if (!Config.token) {
      return
    }
    return fetchUserInfo().then((res) => {
      const { value } = this.state
      value.user = res
      if (this.props.onChange) {
        this.props.onChange(res)
      }
      this.setState({
        value
      })
      return res
    })
  }
  public render () {
    const { value: { user } } = this.state
    if (user === undefined) {
      return null
    }
    return (
      // <ContextType.Provider value={this.state.value}>
      <Layout className='pilipa-terrace-container'>
        <Left user={user}/>
        <Layout>
          <Top user={user} onChange={this.onChange.bind(this)} />
          <Content className='content'>
            <Switch>
              {this.props.children}
            </Switch>
          </Content>
        </Layout>
      </Layout>
      // </ContextType.Provider>
    )
  }
}
export default withRouter(Main)
