import { fetchToken } from '../api'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Config from '../config'
import cookie from '../cookie'
type Props = RouteComponentProps<{}>
interface State {
  error: string
}
class Main extends React.Component<Props, State> {
  public state = {
    error: ''
  }
  public componentDidMount () {
    const { search } = this.props.location
    let code = ''
    try {
      code = search.match(/code=(\w+)&?/)[1]
      fetchToken(code).then((res) => {
        const token = res.access_token
        Config.token = token
        localStorage.setItem('token', token)
        cookie.set({
          token
        }, {
          expires: 24 * 3600 * 30 * 1000
        })
        Config.history('/bind')
      }, (res) => {
        let message = 'token无效'
        try {
          message = res.responseJSON.errors[0].message
        } catch (e) {
          console.log(e)
        }
        this.throwError(message)
      })
    } catch (e) {
      console.log(e, 'E')
      this.throwError()
    }
  }
  public throwError (message?: string) {
    this.setState({
      error: `非法操作，${message}，即将退出...`
    })
    if (/^(localhost|[\d\.]*)$/.test(window.location.host) === false) {
      setTimeout(() => {
        Config.history('/logout')
      }, 2000)
    }
  }
  public render () {
    return (
      <div
        style={{
          margin: '15px'
        }}
      >
          {this.state.error}
      </div>
    )
  }
}
export default withRouter(Main)
