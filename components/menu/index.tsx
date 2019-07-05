import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import SubMenu from './SubMenu'
import { $ } from 'pilipa'
interface Props {
  theme?: 'dark'
  mode?: 'inline'
  selectedKeys: string[]
  openKeys: string[]
}
class Main extends React.Component<Props> {
  public static Item = Item
  public static SubMenu = SubMenu
  // 声明Context对象属性
  public static childContextTypes = {
    openKeys: PropTypes.array,
    selectedKeys: PropTypes.array
  }
  public getChildContext  () {
    return {
      openKeys: this.props.openKeys || [],
      selectedKeys: this.props.selectedKeys || []
    }
  }
  public componentDidMount () {
    this.init()
  }
  public componentDidUpdate () {
    this.init()
  }
  public init () {
    const { openKeys } = this.props
    this.hideAllMenu()
    openKeys.map((key) => {
      const selector = `#${key}Menu`
      $(selector).slideDown()
    })
  }
  public hideAllMenu (cur?: any) {
    const { openKeys } = this.props
    $('.pilipa-menu-sub').each((elem) => {
      if (elem !== cur) {
        if ($.css(elem, 'display') !== 'none' && openKeys.indexOf(elem.id.replace('Menu', '')) === -1) {
          $(elem).slideUp()
        }
      }
    })
  }
  public render () {
    return (
      <div
        ref='menu'
        className='pilipa-menu'
      >
        {this.props.children}
      </div>
    )
  }
}
export default Main
