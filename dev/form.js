import React from 'react'
import { Form } from '../index'
const FormItem = Form.Item
export default class extends React.Component {
  constructor () {
    super()
    this.data = []
    // {'required': true, 'message': '姓名不能为空'}
  }

  render () {
    const inputData = []
    return (
      <div>
        <Form>
          <FormItem
            type='input'
            label='姓名'
            field='name'
            placeholder='请输入姓名'
            semicolon={true}
            rules={{
              required: true,
              message: '姓名不能为空'
            }}
          />
          <FormItem
            type='select'
            label='选择名称'
            field='people'
            data={[
              {name: 'Jack', value: 'jack'},
              {name: 'Lucy', value: 'lucy'},
              {name: 'yiminghe', value: 'Yiminghe'}
            ]}
          />
          <FormItem
            type='radio'
            label='选择性别'
            field='sex'
            data={[
              {name: 'sex', value: 'women', checked: true},
              {name: 'sex', value: 'men'}
            ]}
          />
          <FormItem
            type='checkbox'
            label='爱好'
            field='hobby'
            data={[
              {name: 'hobby', displayName: '', value: 'sing', checked: true},
              {name: 'hobby', displayName: '', value: 'dance'},
              {name: 'hobby', displayName: '', value: 'swim'}
            ]}
          />
          <Form.Item>
            <button type='submit' className='ant-btn ant-btn-primary'><span>Submit</span></button>&nbsp;&nbsp;
            <button type='reset' className='ant-btn ant-btn-primary'><span>Reset</span></button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
