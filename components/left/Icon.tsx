import classNames from 'classnames'
import React from 'react'
interface Props {
  type: 'bussiness' | 'open' | 'customer' | 'sign' | 'set' | 'center' | 'organ' | 'user' | 'worker' | 'message' | 'task' | 'tasktpl' | 'perform' | 'data' | 'configure' | 'log'
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <span className={classNames('menu-icon', `menu-icon-${this.props.type}`)}></span>
    )
  }
}
export default Main
