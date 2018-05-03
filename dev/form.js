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
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 }
    }
    return (
      <div>
        <Form
          column={4}
        >
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
            value='张三'
            {...formItemLayout}
          />
          <FormItem
            type='select'
            label='选择名称'
            field='people'
            data={[
              {name: 'Jack', value: 'jack'},
              {name: 'Lucy', value: 'lucy', selected: true},
              {name: 'yiminghe', value: 'Yiminghe'}
            ]}
            {...formItemLayout}
          />
          <FormItem
            type='radio'
            label='选择性别'
            field='sex'
            data={[
              {name: 'sex', value: 'women', displayName: 'women', checked: true},
              {name: 'sex', value: 'men', displayName: 'men'}
            ]}
            {...formItemLayout}
          />
          <FormItem
            type='checkbox'
            label='爱好'
            field='hobby'
            data={[
              {name: 'hobby', displayName: 'sing', value: 'sing', checked: true},
              {name: 'hobby', displayName: 'dance', value: 'dance'},
              {name: 'hobby', displayName: 'swim', value: 'swim'}
            ]}
            {...formItemLayout}
          />
          <FormItem
            type='dropdown'
            label='纳税人类别'
            field='taxType'
            data={[
              {key: -1, title: '- - 纳税人类别 - -'},
              {key: 1, title: '小规模纳税人'},
              {key: 2, title: '一般纳税人'}
            ]}
            {...formItemLayout}
          />
        </Form>
      </div>
    )
  }
}
