import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
interface Props {
  hidden: boolean
  onClick: () => void
}
class Main extends React.Component<Props> {
  public static contextTypes = {
    openKeys: PropTypes.array,
    selectedKeys: PropTypes.array
  }
  public _reactInternalFiber: {
    key: string
  }
  public handleClick () {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }
  public render () {
    const { hidden } = this.props
    const { selectedKeys } = this.context
    const key = this._reactInternalFiber.key
    return (
      <div
        hidden={hidden}
        ref='el'
        className={classNames('pilipa-menu-item', {'pilipa-menu-item-selected': selectedKeys.indexOf(key) > -1})}
        onClick={this.handleClick.bind(this)}
      >
        <div>{this.props.children}</div>
      </div>
    )
  }
}
export default Main
