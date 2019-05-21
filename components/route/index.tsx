import React from 'react'
import { Route, RouteProps } from 'react-router'
interface Props extends RouteProps {
  hidden?: boolean
}
class Main extends React.Component<Props> {
  public render () {
    const props: Props = this.props
    const hidden = props.hidden !== undefined ? props.hidden : false
    if (hidden) {
      return null
    }
    delete props.hidden
    return (
      <Route {...props} />
    )
  }
}
export default Main
