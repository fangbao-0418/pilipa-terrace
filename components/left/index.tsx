import React from 'react'
import { Layout, Menu } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { UserProps } from '../iframe/ContextType'
import { getHomePage } from './config'
import Config, { MenuItem } from '../config'
import Icon from './Icon'
const SubMenu = Menu.SubMenu
const { Sider } = Layout

interface Props extends RouteComponentProps {
  user: UserProps
}
interface State {
  collapsed: boolean
  selectedKeys: string[]
  openKeys: string[]
}
class Main extends React.Component<Props, State> {
  public state: State = {
    collapsed: false,
    selectedKeys: [],
    openKeys: []
  }
  public pathInfo: {[key: string]: MenuItem} = {}
  public homePage = getHomePage()
  public componentDidMount () {
    this.getActive()
  }
  public componentWillReceiveProps (props: Props) {
    if (this.props.location.pathname !== props.location.pathname) {
      this.getActive(props.location.pathname)
    }
  }
  public getActive (pathname = this.props.location.pathname) {
    let selectedKey = ''
    for (const key in this.pathInfo) {
      if (this.pathInfo.hasOwnProperty(key)) {
        const item = this.pathInfo[key]
        const path = item.path
        const pattern = new RegExp(`^${path}[\/\]?$`)
        if (pattern.test('/' + item.mark + pathname) && (item.mark === Config.type || !Config.type)) {
          selectedKey = key
          Config.mark = this.pathInfo[key].mark
        }
      }
    }
    this.setState({
      openKeys: [selectedKey.substr(0, selectedKey.length - 2)],
      selectedKeys: [selectedKey]
    })
  }
  public toHome () {
    this.history(this.homePage.path, this.homePage.mark)
  }
  public history (url: string, mark: string = Config.mark) {
    const pattern = new RegExp(`^/${mark}`)
    url = url.replace(pattern, '')
    if (Config.env === 'development') {
      Config.history(url)
      return
    }
    if (mark === Config.type) {
      this.props.history.push(url)
    } else {
      window.location.href = '/' + mark + url
    }
  }
  public getMenuNodes (configs = Config.menu, prefKey = 'm') {
    const nodes: JSX.Element[] = []
    configs.forEach((item, index) => {
      const key = [prefKey, index].join('-')
      const path = item.path
      this.pathInfo[key] = item
      let Item
      const icon = Config.env === 'development' ? `https://x-b.i-counting.cn${item.icon}` : item.icon
      if (item.children) {
        Item = (
          <SubMenu
            hidden={item.hidden}
            key={key}
            title={(
              <span>
                {!!item.icon && <Icon src={icon} />}
                <span>{item.title}</span>
              </span>
            )}
            onTitleClick={() => {
              this.setState({
                openKeys: key === this.state.openKeys[0] ? [] : [key]
              })
            }}
          >
            {this.getMenuNodes(item.children, key)}
          </SubMenu>
        )
      } else {
        Item = (
          <Menu.Item
            hidden={item.hidden}
            key={key}
            onClick={(menuitem: {key: string}) => {
              if (path) {
                this.setState({
                  openKeys: [prefKey],
                  selectedKeys: [menuitem.key]
                })
                this.history(path, item.mark)
              }
            }}
          >
            {!!item.icon && <Icon src={icon} />}
            <span
            >
              {item.title}
            </span>
          </Menu.Item>
        )
      }
      nodes.push(Item)
    })
    return nodes
  }
  public render () {
    const logo = Config.env === 'development' ? `https://x-b.i-counting.cn${Config.logo}` : Config.logo
    return (
      <Sider
        className='pilipa-terrace-left'
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className='top'>
          <div
            onClick={() => {
              this.toHome()
            }}
            className={'logo'}
          >
            <img src={logo} />
          </div>
        </div>
        <div className='menu'>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={this.state.selectedKeys}
            openKeys={this.state.openKeys}
            // defaultSelectedKeys={['m-0-0']}
          >
            {this.getMenuNodes()}
          </Menu>
        </div>
      </Sider>
    )
  }
}
export default withRouter(Main)
