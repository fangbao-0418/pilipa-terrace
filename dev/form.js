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
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
    return (
      <div>
        <Form
          column={3}
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
            defaultValue='lucy'
            data={[
              {name: 'Jack', value: 'jack'},
              {name: 'Lucy', value: 'lucy'},
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
              {name: 'hobby', displayName: 'dance', value: 'dance', checked: true},
              {name: 'hobby', displayName: 'swim', value: 'swim'}
            ]}
            {...formItemLayout}
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
            {...formItemLayout}
          />
        </Form>
      </div>
    )
  }
}
