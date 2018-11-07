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
import Config, { TypeProps } from '../config'
interface Props extends RouteComponentProps<{}> {
  env?: 'development' | 'production'
  token?: string
  onChange?: (user?: UserProps) => void
  type?: TypeProps
}
class Index extends React.Component<Props> {
  public componentWillMount () {
    Config.type = this.props.type
    if (this.props.env !== 'production') {
      Config.history = this.props.history.push
    }
  }
  public render () {
    return (
      this.props.env === 'production' ? (
        <Switch>
          <Main {...this.props}/>
        </Switch>
      ) : (
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Main {...this.props}/>
        </Switch>
      )
    )
  }
}
export default withRouter(Index)
