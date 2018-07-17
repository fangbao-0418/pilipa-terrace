import React from 'react'
import Voucher from '../components/voucher'

const data = [{
  summary: '2-15应收商品收入（普票）,税率：3.00%',
  name: '预付账款_待摊费用',
  debit: 12000,
  credit: 0,
  taxRate: 3.00
},
{
  summary: '2-15应收商品收入（普票）,税率：3.00%',
  name: '预付账款_待摊费用',
  debit: 0,
  credit: 12000,
  taxRate: 3.00,
  exchangeRate: 6.8,
  currencyType: '美元',
  originalCurrencyMoney: 1000
}]
export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      isShowTaxRate: true
    }
  }
  onTdClick () {
    console.log(arguments)
    // this.setState({
    //   isShowTaxRate: true
    // })
  }
  toSave () {
    console.log(this.refs.voucher.state.items)
  }
  toShowTax () {
    this.setState({
      isShowTaxRate: !this.state.isShowTaxRate
    })
  }
  render () {
    return (
      <div style={{margin: '100px auto 0px'}}>
        <div style={{textAlign: 'right'}}>
          <button onClick={this.toShowTax.bind(this)}>显示税率</button>
          <button onClick={this.toSave.bind(this)}>保存</button>
        </div>
        <Voucher
          ref='voucher'
          companyName='中投华为科技（北京）有限公司'
          treasurer='江苏报税'
          reviewer='xxx'
          originator='xxx'
          items={data}
          editable={true}
          isForeignCurrency={true}
          type='entry'
          editable={false}
          // isShowTaxRate={this.state.isShowTaxRate}
          fieldCfg={{
            abstract: 'summary',
            subjectName: 'name',
            debitMoney: 'debit',
            creditMoney: 'credit'
          }}
          onTd={this.onTdClick.bind(this)}
        />
      </div>
    )
  }
}
