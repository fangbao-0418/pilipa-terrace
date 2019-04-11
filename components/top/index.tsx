import React from 'react'
import { Layout, Dropdown, Menu } from 'antd'
import { UserProps } from '../iframe/ContextType'
import Config from '../config'
// 消息提醒
import Msg from '../message/services/message'
import { companylist, bindCompany } from '../api'
const { Header } = Layout
interface Props {
  user: UserProps
  onChange?: () => void
}
interface State {
  msgCount: number
  collapsed: boolean
  companyList: Array<{companyName: string, companyId: string}>
}
class Main extends React.Component<Props, State> {
  public msg: any
  public state: State = {
    msgCount: 0,
    collapsed: false,
    companyList: []
  }
  public componentDidMount () {
    // 消息初始化
    this.msg = Msg({}).connect()
    // 交互：获取到已读消息数
    this.msg.evAdd('service:get unreaded count data', (data: number) => {
      data = data ? data : 0
      this.setState({
        msgCount: data
      })
    })
    companylist(Config.token).then((res) => {
      this.setState({
        companyList: res
      })
    })
  }
  // 设置右上角消息提醒
  public msgAlert () {

  }
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  public switchCompany (code: string, onChange: () => void) {
    bindCompany({
      token: Config.token,
      companyId: code
    }).then(() => {
      if (onChange) {
        onChange()
      }
    })
  }
  public history (url: string) {
    Config.history(url)
  }
  public getMenu (onChange: () => void) {
    const { companyList } = this.state
    const menu = (
      <Menu
        // mode='inline'
        // style={{width: 00}}
      >
        <Menu.Item
          onClick={() => {
            this.history('/permission/info')
          }}
        >
          <span>
            账号设置
          </span>
        </Menu.Item>
        {
          companyList.length > 1 && (
            <Menu.SubMenu title='切换公司'>
              {
                companyList.map((item) => {
                  return (
                    <Menu.Item
                      onClick={(val: {key: string}) => {
                        this.switchCompany(val.key, onChange)
                      }}
                      key={item.companyId}
                    >
                      <span>{item.companyName}</span>
                    </Menu.Item>
                  )
                })
              }
            </Menu.SubMenu>
          )
        }
        <Menu.Item
          onClick={() => {
            this.history('/logout')
          }}
        >
          <span>
            退出
          </span>
        </Menu.Item>
      </Menu>
    )
    return menu
  }
  public render () {
    const { user, onChange } = this.props
    return (
      // <ContextType.Consumer>
      //   {({ user, onChange }) => (
      <Header
        className={'pilipa-terrace-top'}
      >
        <div
          className={'top-right'}
        >
          <span
            className={`icon message`}
            style={{
              backgroundImage: `url(${require('../assets/images/message.png')})`,
              width: '14px',
              height: '16px',
              marginRight: '25px'
            }}
            onClick={() => {
              this.msg.uiLogicLinkToList()
            }}
          >
            <i
              className={'point'}
              style={{visibility: this.state.msgCount ? 'visible' : 'hidden'}}
            />
          </span>
          <span
            className={'username'}
            style={{
              marginRight: '15px'
            }}
          >
            {user.username}
          </span>
          <Dropdown
            overlay={this.getMenu(onChange)}
          >
            <span
              className='icon'
              style={{
                backgroundImage: `url(${require('../assets/images/user-menu.png')})`,
                width: '14px',
                height: '14px'
              }}
            />
          </Dropdown>
        </div>
      </Header>
        // )}
      // </ContextType.Consumer>
    )
  }
}
export default Main
