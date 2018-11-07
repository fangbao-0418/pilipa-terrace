import React from 'react'
import Top from '../top'
import Left from '../left'
import Config from '../config'
import { getHomePage } from '../left/config'
import {
  Switch,
  Route
} from 'react-router-dom'
import { Layout } from 'antd'
import { fetchUserInfo } from './api'
import ContextType, { ValueProps, UserProps } from './ContextType'
const { Content } = Layout
interface Props {
  env?: 'development' | 'production'
  token?: string
  onChange?: (user?: UserProps) => void
}
interface State {
  value: ValueProps
}
class Main extends React.Component<Props> {
  public state: State = {
    value: {
      user: undefined,
      onChange: this.onChange.bind(this)
    }
  }
  public constructor (props: Props) {
    super(props)
    Config.env = props.env === undefined ? 'development' : props.env
    Config.token = props.token
  }
  public componentWillMount () {
    this.fetchUser()
  }
  public onChange () {
    this.fetchUser().then(() => {
      const path = getHomePage().path
      if (Config.env === 'production') {
        window.location.href = path
      } else {
        Config.history(path)
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
      <ContextType.Provider value={this.state.value}>
        <Layout className='pilipa-terrace-container'>
          <Left user={user}/>
          <Layout>
            <Top />
            <Content className='content'>
              <Switch>
                {this.props.children}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </ContextType.Provider>
    )
  }
}
export default Main
