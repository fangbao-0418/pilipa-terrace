import { fetchUaaLoginUrl, queryToObject, uaaLogout } from '../api'
import Config from '../config'
import cookie from '../cookie'
import React from 'react'
class Main extends React.Component {
  public componentDidMount () {
    const res = queryToObject(window.location.search.replace(/^\?/, ''))
    uaaLogout().always(() => {
      Config.token = ''
      Config.user = undefined
      if (window.localStorage) {
        localStorage.clear()
        sessionStorage.clear()
      }
      cookie.removeAll()
      const url = fetchUaaLoginUrl(res.path)
      window.location.href = url
    })
  }
  public render () {
    return (
      <div></div>
    )
  }
}
export default Main
