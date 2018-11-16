/**
 * 提醒工具类
 *
 * 1. 通信类，支持推拉
 * 2. UI类，基于antd
 * 暂时不拆分，后期可分离协议类，授权类、通信驱动类、UI类、消息逻辑类
 */
import React from 'react'
import { ReactNode } from 'react'
import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import { Button } from 'antd'
import _ from 'lodash'
import Config from '../../config'
import MsgService from './index'

type Method = (...args: Array<any>) => any
interface MessageData {
  title: string,
  content: string,
  id: any
}
// 消息类型
interface MsgUIConf {
  btn?: ReactNode	                  // 自定义关闭按钮	ReactNode	-
  className?: string                // 自定义 CSS class	string	-
  message?: string | ReactNode      // 通知提醒标题，必选	string|ReactNode	-
  description?: string | ReactNode  // 通知提醒内容，必选	string|ReactNode	-
  duration?: any                    // 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭	number	4.5
  icon?: ReactNode                  // 自定义图标	ReactNode	-
  key?: string	                    // 当前通知唯一标志	string	-
  placement?: string                // 弹出位置，可选 topLeft topRight bottomLeft bottomRight	string	topRight
  style?: React.CSSProperties       // 自定义内联样式	React.CSSProperties	-
  onClose?: Method                  // 点击默认关闭按钮时触发的回调函数	Function	-
}

// Msg默认参数
interface Conf {
  token?: string,
  pullConf?: any
}

// 消息接口
interface MsgI {
  // config?: any
  getToken?: Method     // 获取token
  refreshToken?: Method // 刷新token

  connect?: Method      // 通信 连接，默认需要添加：根据通信方式，补充onData监听
  close?: Method        // 通信 断开连接
  onData?: Method       // 暂定一个dada事件，发布订阅

  evAdd?: Method
  evRemove?: Method
  evTrigger?: Method

  uiOpen?: Method       // 基础方法
  uiShow?: Method       // 通用方法
  uiAlert?: Method      // 类型
  uiError?: Method      // 类型
}

// 消息类型
const msgActions = {
  REMINDER: 'REMINDER' // 催单
}

class Msg implements MsgI {
  public config: any
  private conf: Conf = {
    // 拉模式配置
    pullConf : {
      // duration: 1000 * 60 * 15
      duration: 1000 * 60 * 15
    }
  }
  private looptimer: any
  private evs: any

  // 初始化
  public constructor (conf: Conf = {}) {
    this.conf = _.extend(this.conf, conf)
    this.evs = {}
  }

  // 默认使用拉形式
  public connect (conf: any = {}) {
    return this.pullConnect(this.conf)
  }

  public onData (data: MessageData) {
    return this.pullOnData(data)
  }

  public close () {
    return this.pullClose()
  }

  public evAdd (ev: string, fn: Method) {
    if (!this.evs[ev]) {
      this.evs[ev] = []
    }
    this.evs[ev].push(fn)
    return this
  }

  public evRemove (ev: string) {
    if (!this.evs[ev]) {
      return this
    }
    delete this.evs[ev]
    return this
  }

  public evTrigger (ev: string, ...args: Array<any>) {
    if (!this.evs[ev]) {
      return this
    }
    this.evs[ev].map((fn: Method) => fn(...args))
    return this
  }

  // 消息可视化展现方法
  public uiOpen (conf: ArgsProps) {
    notification.open(conf)
    return this
  }
  public uiShow (conf: ArgsProps) {
    notification.info(conf)
    return this
  }
  public uiClose () {
    notification.destroy()
  }
  public uiError (conf: ArgsProps) {
    notification.error(conf)
    return this
  }

  // ui method
  public uiLogicLinkToList () {
    if (Config.env === 'production') {
      window.location.href = '/message/list'
    } else {
      Config.history('/message/list')
    }
  }

  // 拉模式的连接、中断、基础数据返回操作方法
  private pullConnect (conf: any) {
    const fetchMsg = () => {
      // 获取单条消息提醒
      MsgService.getCurrentByUserid().then((data: any) => {
        // 手动关闭弹层,同一时刻，只保留一个
        this.uiClose()

        // 发布获取数据消息
        this.evTrigger('data', data)
        this.evTrigger('service:get unreaded item data', data)

        // 通用数据交互
        this.onData(data)
      }).catch((e: any) => {
        // this.onData({title: '错误', content: '暂无提醒'})
        console.error('message error:', e)
        /* 消息默认去掉错误提醒
        this.uiError({
          // message: '数据有误',
          message: null,
          description: e.toString() // 'error'
        })
        */
      })

      // 获取未读消息数
      MsgService.countUnreadedByUserid().then((data: any) => {
        this.evTrigger('service:get unreaded count data', data)
      })
    }
    fetchMsg()
    this.looptimer = setInterval(fetchMsg, this.conf.pullConf.duration)
    // this.looptimer = fetchMsg
    return this
  }
  private pullClose () {
    clearInterval(this.looptimer)
    this.looptimer = null
    this.evTrigger('close')
    return this
  }
  // 消息驱动模式比较固定，但是ui和交互不确定，暂时放到一个方法里
  private pullOnData (data: MessageData) {
    if (!data && !data.title) {return}

    // 标记消息为已读
    const setReaded = (id = data.id) => {
      return MsgService.readListByIds([id])
    }
    // 关闭
    const onClose = () => {
      console.log('message closed.....')
      setReaded()
    }

    this.uiOpen({
      message: '消息提醒',
      description: (
        <div>
          <h5 style={{fontSize: '14px', borderTop: '1px solid #ddd', padding: '15px 0 0'}}>{data.title}</h5>
          <p>{data.content}</p>
          <div style={{textAlign: 'right'}}>
            <Button
              type='primary'
              onClick={() => {
                // 关闭弹层
                this.uiClose()
                // 设为已读
                setReaded()
                console.log('???????????//', data.id)
                this.uiLogicLinkToList()
              }}
            >查看详情
            </Button>
          </div>
        </div>
      ),
      onClose,
      placement: 'bottomRight',
      duration: null // 不自动关闭
    })
    return this
  }
}

export default (conf: Conf) => {
  return new Msg(conf)
}
