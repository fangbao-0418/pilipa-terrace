import React from 'react'
import Voucher from '../components/voucher'

const data = [{
  SubjectAbstract: '2-15应收商品收入（普票）,税率：3.00%',
  SubjectName: '预付账款_待摊费用',
  DebitMoney: 111236.11,
  CreditorMoney: 0.02,
  TaxRate: 3.00
},
{
  SubjectAbstract: '2-15应收商品收入（普票）,税率：3.00%',
  SubjectName: '预付账款_待摊费用',
  DebitMoney: -1111236.00,
  CreditorMoney: 0.00,
  TaxRate: 3.00
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
          date='2018-02-28'
          voucherNo='记-1'
          treasurer='江苏报税'
          reviewer='xxx'
          originator='xxx'
          items={data}
          editable={true}
          isShowTaxRate={this.state.isShowTaxRate}
          fieldCfg={{
            abstract: 'SubjectAbstract',
            subjectName: 'SubjectName',
            debitMoney: 'DebitMoney',
            creditMoney: 'CreditorMoney',
            taxRate: 'TaxRate'
          }}
          onTd={this.onTdClick.bind(this)}
        />
      </div>
    )
  }
}
