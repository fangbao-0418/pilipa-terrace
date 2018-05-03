import ClassNames from 'classnames'
import $ from 'jquery'
import React, {Children, cloneElement} from 'react'
import FormItem from './FormItem'

export interface FormProps {
  className?: string
  style?: React.CSSProperties
  children?: Array<React.ReactElement<any>>
  column?: number
  layout?: string
  onSubmit?: React.FormEventHandler<any>
}
export interface FormStates {
  formData: any
}
export default class  extends React.Component<FormProps, FormStates> {
  public static Item = FormItem
  public defaultCls = 'pilipa-form'
  public children: any = null

  public constructor (props: FormProps) {
    super(props)
    this.formDataChange = this.formDataChange.bind(this)
    this.getField = this.getField.bind(this)
    this.state = {
      formData: []
    }
  }
  public componentWillMount () {
  }
  public componentDidMount () {
  }
  public getField = (e: any) => {
    const data = $.extend(true, this.state.formData, [])
    const item = $.extend(true, e, [])
    data.push(item)
    console.log(item)
    const dataForm: any = {}
    data.map((every: any, index: number) => {
      if (every.field) {
        if (every.data && every.data.length > 0) {
          let tempVal: any = every.type === 'checkbox' ? [] : null
          every.data.map((dataItem: any) => {
            console.log(dataItem)
            if (dataItem.checked || dataItem.selected) {
              if (every.type === 'checkbox') {
                tempVal.push(dataItem.value)
              } else {
                tempVal = dataItem.value
              }
            }
          })
          dataForm[every.field] = tempVal ? tempVal : every.data[0].value
        } else {
          dataForm[every.field] = every.value !== undefined ? every.value : null
        }
      }
    })
    this.setState({formData: dataForm}, () => {
      console.log(this.state.formData)
    })
  }
  public formSubmit = () => {
    console.log('submit', this.state.formData)
  }
  public handleFormSubmit = (e: any) => {
    e.preventDefault()
    this.formSubmit()
  }

  public formDataChange = (e: any) => {
    console.log('change', e)
    const {formData} = this.state
    const data = $.extend(true, formData, {})
    for (const key of Object.keys(data)) {
      console.log(key)
      if (key === e.name) {
        data[key] = e.value
      }
    }
    this.setState({formData: data}, () => {
      console.log(this.state.formData)
    })
  }

  public handleFormChange = () => {
  }

  public render () {
    const {defaultCls, props} = this
    const {className, style, children, layout, column} = props
    const formClassName = ClassNames(defaultCls, {
      [`${defaultCls}-horizontal`]: layout === 'horizontal',
      [`${defaultCls}-vertical`]: layout === 'vertical',
      [`${defaultCls}-inline`]: layout === 'inline',
      [`${defaultCls}-item-column-${column}`]: column > 0
    },
      className
    )
    return (
      <form
        className={formClassName}
        style={style}
        onSubmit={(e: any) => this.handleFormSubmit(e)}
        onChange={this.handleFormChange.bind(this)}
      >
        {
          Children.map(children, (child) =>
            cloneElement(child as React.ReactElement<any>,
              {formDataChange: this.formDataChange, getField: this.getField}))
        }
      </form>
    )
  }
}
