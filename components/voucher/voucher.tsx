import ClassNames from 'classnames'
import $ from 'jquery'
import React, { SyntheticEvent } from 'react'
export interface MyProps {
  className?: string
  style?: React.CSSProperties
  items?: any[]
  companyName: string
  accountPeriod: string
  treasurer: string
  reviewer: string
  originator: string
  editable?: boolean
  fieldCfg?: {
    abstract: string
    subjectName: string
    debitMoney: string
    creditMoney: string
    taxRate: string
  }
  isForeignCurrency?: boolean // 是否是外币
  header?: React.ReactElement<any>
  onTd?: (event: JQuery.Event, items: any[], index: number) => void
}
export interface MyStates {
  items: any[]
}
class Voucher extends React.Component<MyProps, MyStates> {
  public state = {
    items: this.props.items
  }
  public defaultCls = 'pilipa-voucher'
  public componentDidMount () {
    this.setTrHover()
    this.initOperate()
  }
  public setTrHover () {
    if (this.props.editable === false) {
      return
    }
    const el = $(this.refs.voucher)
    el.find('table tbody tr').hover((event) => {
      $(event.currentTarget).find('.fa').css({opacity: 1})
    }, (event) => {
      $(event.currentTarget).find('.fa').css({opacity: 0})
    })
  }
  public initOperate () {
    const el = $(this.refs.voucher)
    const { items } = this.state
    el.find('table tbody tr td:nth-child(1) .fa').unbind('click').click((item) => {
      const target = item.target
      const index = $(item.target).parent().parent().index()
      if (target.className === 'fa fa-plus') {
        items.splice(index + 1, 0, {})
      } else if (target.className === 'fa fa-minus') {
        items.splice(index, 1)
      }
      this.setState({
        items
      }, () => {
        this.initOperate()
        this.setTrHover()
      })
    })
    this.setTdClick()
  }
  public setTdClick () {
    if (this.props.editable === false) {
      return
    }
    const el = $(this.refs.voucher)
    el.find('table tbody tr td').unbind('click').click((event) => {
      const index = $(event.currentTarget).parent().index()
      if (this.props.onTd) {
        this.props.onTd(event, this.state.items, index)
      }
    })
  }
  public moneyUnitNode () {
    const str = '亿千百十万千百十元角分'
    const node: JSX.Element[] = []
    str.split('').forEach((item, index) => {
      node.push(<span key={this.defaultCls + '-money-unit-' + index}>{item}</span>)
    })
    return node
  }
  public mapTrNode () {
    const { fieldCfg, isForeignCurrency } = this.props
    const { items } = this.state
    const node: JSX.Element[] = []
    items.map((item, index) => {
      node.push(
        <tr key={this.defaultCls + '-tr-' + index}>
          <td>
            <i className='fa fa-plus' aria-hidden='true'></i>
            <i className='fa fa-minus' aria-hidden='true'></i>
          </td>
          <td>{item[fieldCfg.abstract]}</td>
          <td>{item[fieldCfg.subjectName]}</td>
          { isForeignCurrency ?
            <td>
              <input
                onChange={this.onTaxRateChange.bind(this, index)}
                value={item[fieldCfg.taxRate] || ''}
                maxLength={5}
              />
            </td>
            :
            null
          }
          <td>{this.convertMoney(item[fieldCfg.debitMoney])}</td>
          <td>{this.convertMoney(item[fieldCfg.creditMoney])}</td>
        </tr>
      )
    })
    return node
  }
  public onTaxRateChange (index: number, event: SyntheticEvent<{value: number}>) {
    if (this.props.editable === false) {
      return
    }
    const value = event.currentTarget.value
    const { items } = this.state
    const { fieldCfg } = this.props
    items[index][fieldCfg.taxRate] = value
    this.setState({
      items
    })
  }
  public convertMoney (num: number) {
    if (!num) {
      num = 0
    }
    const node: JSX.Element[] = []
    let money = (Math.round(Math.abs(num) * 100)).toString()
    console.log(money)
    const maxNum = Math.pow(10, 11)
    if (parseFloat(money) > maxNum) {
      money = (maxNum - 1).toString()
    }
    const arr = (' '.repeat((11 - money.length)) + money).split('')
    arr.map((item, index) => {
      node.push(
        <span
          style={{color: num < 0 ? 'red' : null}}
          key={this.defaultCls + '-money-' + index}
        >
          {item}
        </span>)
    })
    return <div className='money-unit'>{node}</div>
  }
  public getTotal (): {debitMoney: number, creditMoney: number} {
    const { fieldCfg } = this.props
    const { items } = this.state
    let debitMoney = 0
    let creditMoney = 0
    items.map((item: any) => {
      debitMoney += (item[fieldCfg.debitMoney] || 0)
      creditMoney += (item[fieldCfg.creditMoney] || 0)
    })
    return {
      debitMoney,
      creditMoney
    }
  }
  public amountInWords () {
    // 壹（壹）、贰（贰）、叁、肆（肆）、伍（伍）、陆（陆）、柒、捌、玖、拾、佰、仟、万（万）、亿、元、角、分、零、整（正）
    const upperCase = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const total = this.getTotal()
    const num = Math.abs(total.debitMoney) * 100 || 0
    if (num > 99999999999) {
      return <span style={{color: 'red'}}>非法数值</span>
    }
    const arr = (num).toString().split('').reverse()
    const pos = '亿仟佰拾万仟佰拾元角分'.split('').reverse()
    const res: string[] = []
    arr.map((item, index) => {
      console.log(pos[index], pos, index)
      res.push(upperCase[Number(item)] + pos[index])
    })
    let str = ''
    const raw = res.reverse().join('')
    const pattern = new RegExp('(零角)?零分', 'g')
    const pattern1 = new RegExp('(零[亿仟佰拾仟佰拾元])+', 'g')
    const pattern2 = new RegExp('零(([零壹贰叁肆伍陆柒捌玖][角分]){1,2})$', 'g')
    const pattern3 = new RegExp('(零万)+', 'g')
    const pattern4 = new RegExp('(零角)+', 'g')
    str = raw.replace(pattern, '')
    .replace(pattern1, '零')
    .replace(pattern2, '元$1')
    .replace(pattern3, '万')
    .replace(pattern4, '零')
    .replace(/零$/, '元整')
    return str || '零元整'
  }
  public render () {
    const {
      className, style, treasurer, reviewer, originator, isForeignCurrency
    } = this.props
    const total = this.getTotal()
    return (
      <div ref='voucher' className={ClassNames(this.defaultCls, className)} style={style}>
        <div className={this.defaultCls + '-header'}>
          <h3>记账凭证</h3>
          <div>
            {this.props.header}
          </div>
        </div>
        <table className={ClassNames(this.defaultCls + '-table' + (isForeignCurrency ? 2 : 1))}>
          <thead>
            <tr>
              <th rowSpan={2}></th>
              <th rowSpan={2}>摘要</th>
              <th rowSpan={2}>会计科目</th>
              {isForeignCurrency ? <th rowSpan={2}>外币</th> : null}
              <th>借方金额</th>
              <th>贷方金额</th>
            </tr>
            <tr>
              <th>
                <div className='money-unit'>
                  {this.moneyUnitNode()}
                </div>
              </th>
              <th>
                <div className='money-unit'>
                  {this.moneyUnitNode()}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.mapTrNode()}
            <tr>
              <td></td>
              <td colSpan={!isForeignCurrency ? 2 : 3}>
                合计：{this.amountInWords()}
              </td>
              <td>{this.convertMoney(total.debitMoney)}</td>
              <td>{this.convertMoney(total.creditMoney)}</td>
            </tr>
          </tbody>
        </table>
        <div className={this.defaultCls + '-footer'}>
          <p>
            <span>主管会计：{treasurer}</span>
            <span>审核人：{reviewer}</span>
            <span>制单人：{originator}</span>
          </p>
        </div>
      </div>
    )
  }
}
export default Voucher
