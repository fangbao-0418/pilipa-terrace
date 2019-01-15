import React from 'react'
import { fetchUaaLoginUrl } from '../api'
class Main extends React.Component {
  public componentDidMount () {
    const url = fetchUaaLoginUrl()
    window.location.href = url
  }
  public render () {
    return (
      <div></div>
    )
  }
}
export default Main
