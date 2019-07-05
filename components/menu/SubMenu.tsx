import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
interface Props {
  hidden: boolean
  title: React.ReactNode
  onTitleClick: () => void
}
class Main extends React.Component<Props> {
  public static contextTypes = {
    openKeys: PropTypes.array,
    selectedKeys: PropTypes.array
  }
  public _reactInternalFiber: {
    key: string
  }
  public onTitleClick () {
    if (this.props.onTitleClick) {
      this.props.onTitleClick()
    }
  }
  public render () {
    const { hidden } = this.props
    const key = this._reactInternalFiber.key
    const openKeys = this.context.openKeys
    return (
      <div
        hidden={hidden}
        ref='submenu'
        className={classNames('pilipa-menu-submenu', {open: openKeys.indexOf(key) > -1})}
      >
        <div
          className='pilipa-menu-submenu-title'
          onClick={this.onTitleClick.bind(this)}
        >
          {this.props.title}
          <i
            className={`pilipa-menu-submenu-arrow fa ${openKeys.indexOf(key) === -1 ? 'fa-angle-down' : 'fa-angle-up'}`}
          />
        </div>
        <div id={`${key}Menu`} ref='sub' className='pilipa-menu-sub'>
          <div
            style={{marginLeft: 24}}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
export default Main
