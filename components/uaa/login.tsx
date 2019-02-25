import React from 'react'
import { fetchUaaLoginUrl, queryToObject } from '../api'
class Main extends React.Component {
  public componentDidMount () {
    const res = queryToObject(window.location.search.replace(/^\?/, ''))
    const url = fetchUaaLoginUrl(res.jump)
    window.location.href = url
  }
  public render () {
    return (
      <div></div>
    )
  }
}
export default Main
