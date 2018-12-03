import React from 'react'
import { Button } from 'antd'
import GVerify from '../utils/gVerify'
import { userLogin, fetchSmsVerifyCode } from '../api'
import classNames from 'classnames'
import Config from '../config'
import cookie from '../cookie'
interface Props {
  onOk?: () => void
}
interface State {
  type: number
  error: any
  message: string
}
class Main extends React.Component<Props> {
  public state: State = {
    type: 1,
    error: {},
    message: '获取验证码'
  }
  public values: any = {}
  public verify: any
  public num = 0
  public componentDidMount () {
    this.verify = new GVerify('verify')
  }
  public changeType (type: number) {
    this.setState({
      type
    })
  }
  public toLogin () {
    const { error } = this.state
    if (!/^1[3456789][0-9]\d{8}$/.test(this.values.phone)) {
      error.phone = '手机号码格式不正确'
    }
    if (!this.verify.validate(this.values['verify-code'] || '')) {
      error['verify-code'] = '图片验证码不匹配'
    }
    if (!this.values['sms-verify-code']) {
      error['sms-verify-code'] = '短信验证码不能为空'
    }
    this.setState({
      error
    })
    if (error.phone || error['verify-code'] || error['sms-verify-code']) {
      return
    }
    userLogin({
      phone: this.values.phone,
      validCode: this.values['sms-verify-code']
    }).then((res) => {
      Config.token = res.token
      localStorage.setItem('token', res.token)
      cookie.set({
        token: res.token
      }, {
        expires: 24 * 3600 * 30 * 1000
      })
      if (this.props.onOk) {
        this.props.onOk()
      }
    }, (err) => {
      error.phone = err.responseJSON.errors[0].message || '登陆失败'
      this.setState({
        error
      })
    })
  }
  public handleChange (field: 'phone' | 'verify-code' | 'sms-verify-code', e: React.SyntheticEvent) {
    const { error } = this.state
    error[field] = undefined
    if (field === 'sms-verify-code') {
      error.phone = undefined
    }
    this.setState({
      error
    })
    const target: any = e.target
    const value = target.value
    this.values[field] = value
  }
  public getSmsVerifyCode () {
    const { error } = this.state
    if (!/^1[3456789][0-9]\d{8}$/.test(this.values.phone)) {
      error.phone = '手机号码格式不正确'
      this.setState({
        error
      })
      return
    }
    if (this.num === 0) {
      fetchSmsVerifyCode(this.values.phone)
      this.num = 59
      this.setState({
        message: '获取验证码'
      })
    } else {
      return
    }
    this.setState({
      message: `${this.num}s重新发送`
    })
    const t = setInterval(() => {
      if (this.num <= 1) {
        this.num = 0
        this.setState({
          message: '获取验证码'
        })
        clearInterval(t)
      } else {
        this.num--
        this.setState({
          message: `${this.num}s重新发送`
        })
      }
    }, 1000)
  }
  public render () {
    const { error, message } = this.state
    return (
      <div className={'box'}>
        <div className={'title'}>噼里啪管理系统</div>
        {/* <div className={'switch'}>
          <span className={classNames({active: this.state.type === 1})} onClick={this.changeType.bind(this, 1)}>短信登录</span>
          <span className={classNames({active: this.state.type === 2})} onClick={this.changeType.bind(this, 2)}>微信登录</span>
        </div> */}
        <div className={'sms'} ref='sms'>
          <ul>
            <li className={classNames({'has-error': !!error.phone})}>
              <div className={'phone'}>
                <input maxLength={11} placeholder='请输入手机号' onChange={this.handleChange.bind(this, 'phone')}/>
              </div>
              <span className={'error'}>
                {error.phone}
              </span>
            </li>
            <li className={classNames({'has-error': !!error['verify-code']})}>
              <div className={'verify-text'}>
                <input
                  maxLength={4}
                  onChange={this.handleChange.bind(this, 'verify-code')}
                  placeholder='请输入图文验证码'
                />
              </div>
              <div id='verify' className={'verify-image'} style={{width: '110px', height: '42px'}}></div>
              <span className={'error'}>
                {error['verify-code']}
              </span>
            </li>
            <li className={classNames({'has-error': !!error['sms-verify-code']})}>
              <div className={'sms-verify-text'}>
                <input
                  maxLength={6}
                  onChange={this.handleChange.bind(this, 'sms-verify-code')}
                  placeholder='请输入短信验证码'
                />
                <span
                  style={{color: message === '获取验证码' ? null : '#cccccc'}}
                  onClick={this.getSmsVerifyCode.bind(this)}
                >{message}
                </span>
              </div>
              <span className={'error'}>
                {error['sms-verify-code']}
              </span>
            </li>
          </ul>
          <Button
            size='large'
            type='primary'
            className={'login-btn'}
            onClick={this.toLogin.bind(this)}
          >
            登录
          </Button>
        </div>
      </div>
    )
  }
}
export default Main
