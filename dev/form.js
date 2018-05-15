import React from 'react'
import {Form} from '../index'
const FormItem = Form.Item
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.data = []
  }
  handleSubmit (e) {
    console.log(e)
  }
  render () {
    const formItemLayout = {
      labelCol: 6,
      wrapperCol: 15
    }
    return (
      <div>
        <Form
          onSubmit={(res) => {
            console.log(res)
          }}
          onFormChange={(res) => {
            console.log(res)
          }}
        >
          <div>
            <FormItem
              type='input'
              label='姓名'
              field='name'
              placeholder='请输入姓名'
              semicolon={true}
              required={true}
              value='张三'
              rules={[{
                exp: '',
                message: '姓名不能为空'
              },
              {
                pattern: '',
                message: ''
              }]}
              onChange={(e) => {
                console.log(e)
              }}
              {...formItemLayout}
            />
          </div>
          <FormItem
            type='select'
            label='选择名称'
            field='people'
            defaultValue='lucy'
            data={[
              {name: 'Jack', value: 'jack'},
              {name: 'Lucy', value: 'lucy'},
              {name: 'yiminghe', value: 'Yiminghe'}
            ]}
            onChange={(e) => {
              console.log(e)
            }}
            {...formItemLayout}
          />
          <FormItem
            type='radio'
            label='选择性别'
            field='sex'
            defaultValue='women'
            data={[
              {name: 'sex', value: 'women', displayName: 'women'},
              {name: 'sex', value: 'men', displayName: 'men'}
            ]}
            onChange={(e) => {
              console.log(e)
              console.log(e.target)
            }}
            {...formItemLayout}
          />
          <FormItem
            type='checkbox'
            label='爱好'
            field='hobby'
            defaultValue={['sing', 'dance']}
            data={[
              {name: 'hobby', displayName: 'sing', value: 'sing'},
              {name: 'hobby', displayName: 'dance', value: 'dance'},
              {name: 'hobby', displayName: 'swim', value: 'swim'}
            ]}
            labelCol={2}
            wrapperCol={20}
          />
          <FormItem
            type='dropdown'
            label='纳税人类别'
            field='taxType'
            data={[
              {name: 'taxType', key: -1, value: '- - 纳税人类别 - -'},
              {name: 'taxType', key: 1, value: '小规模纳税人'},
              {name: 'taxType', key: 2, value: '一般纳税人'}
            ]}
            labelCol={10}
            wrapperCol={10}
            onChange={(e) => {
              console.log(e)
            }}
            title='一般纳税人'
          />
          <button type='submit'>submit</button>
        </Form>
        <hr/>
        <FormItem
          type='dropdown'
          label='纳税人类别'
          field='taxType'
          data={[
            {name: 'taxType', key: -1, value: '- - 纳税人类别 - -'},
            {name: 'taxType', key: 1, value: '小规模纳税人'},
            {name: 'taxType', key: 2, value: '一般纳税人'}
          ]}
          labelCol={3}
          wrapperCol={10}
          onChange={(e) => {
            console.log(e)
          }}
        />
      </div>
    )
  }
}
