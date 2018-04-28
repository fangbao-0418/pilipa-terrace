import ClassNames from 'classnames'
import $ from 'jquery'
import React from 'react'
// export interface Rules {
//   required?: boolean
//   message?: string
// }
export interface FormItemProps {
  className?: string
  style?: React.CSSProperties
  required?: boolean
  type?: string
  label?: string
  semicolon?: boolean
  children?: any
  rules?: any
  field?: string
  placeholder?: string
  data?: any
  formDataChange?: any
  checkboxData?: any
  getField?: any
  labelCol?: any
  wrapperCol?: any
}
export interface FormItemState {
  showMessage: boolean
  checkboxData: any
}
export default class FormItem extends React.Component<FormItemProps, FormItemState> {
  public defaultCls = 'pilipa-form-item'

  public constructor (props: FormItemProps) {
    super(props)
    this.state = {
      showMessage: false,
      checkboxData: []
    }
  }
  public componentDidMount () {
    const {props} = this
    this.props.getField(props)
    if (props.type === 'checkbox') {
      this.setState({checkboxData: props.data})
    }
  }
  public componentWillReceiveProps (nextProps: any) {
    console.log(nextProps)
  }
  public handleInputChange (e: any) {
    const inputValue = e.target.value
    const {rules} = this.props
    if (rules && rules.required && inputValue === '') {
      this.setState({showMessage: true})
    } else {
      this.setState({showMessage: false})
    }
    const data = {
      name: e.target.name,
      value: inputValue
    }
    this.props.formDataChange(data)
  }
  public handleSelectChange (e: any) {
    const value = e.target.value
    const {rules} = this.props
    if (rules && rules.required && value === '') {
      this.setState({showMessage: true})
    } else {
      this.setState({showMessage: false})
    }
    const data = {
      name: e.target.name,
      value
    }
    this.props.formDataChange(data)
  }
  public handleRadioChange (e: any) {
    const value = e.target.value
    const {rules} = this.props
    if (rules && rules.required && value === '') {
      this.setState({showMessage: true})
    } else {
      this.setState({showMessage: false})
    }
    const data = {
      name: e.target.name,
      value
    }
    this.props.formDataChange(data)
  }
  public handleCheckboxChange (event: any) {
    const {checkboxData} = this.state
    console.log(event.target)
    const data = $.extend(true, checkboxData, [])
    data.map((item: any, index: number) => {
      if (event.target.value === item.value) {
        data[index].checked = !item.checked
      }
    })
    this.setState({checkboxData: data},() => {
      console.log(this.state.checkboxData)
      this.props.formDataChange(data)
    })
  }
  public render () {
    const {defaultCls, props, state} = this
    const {children, className, style, type, label, semicolon, field, placeholder, data, rules,
      labelCol, wrapperCol} = props
    const {showMessage, checkboxData} = state
    const labelClassName = labelCol && labelCol.span ?
      ClassNames(`${defaultCls}-label`, {[`col-${labelCol.span}`]: true}) :
      `${defaultCls}-label`
    const wrapperClassName = wrapperCol && wrapperCol.span ?
      ClassNames(`${defaultCls}-control-wrapper`, {[`has-error`]: showMessage}, {[`col-${wrapperCol.span}`]: true}) :
      ClassNames(`${defaultCls}-control-wrapper`, {[`has-error`]: showMessage})
    return (
      <div className={ClassNames(defaultCls, className)} style={style}>
        {children}
        {
          label &&
          <div className={labelClassName}>
            <label
              title={label}
              className={ClassNames(
                {[`${defaultCls}-required`]: (rules && rules.required)}
              )}
            >{label}&nbsp;:&nbsp;
            </label>
          </div>
        }
        <div className={wrapperClassName}>
          {
            type === 'input' &&
            <input name={field} placeholder={placeholder} onChange={this.handleInputChange.bind(this)}/>
          }
          {
            (type === 'select' && data.length) &&
            <select
              name={field}
              onChange={this.handleSelectChange.bind(this)}
            >
              {
                data.map((item: any, index: number) => {
                  return <option key={index} value={item.value}>{item.name}</option>
                })
              }
            </select>
          }
          {
            (type === 'radio' && data.length) &&
            data.map((item: any, index: number) => {
              return (<span key={index}>
                <input
                  type='radio'
                  name={item.name}
                  value={item.value}
                  defaultChecked={item.checked}
                  onChange={this.handleRadioChange.bind(this)}
                />&nbsp;&nbsp;{item.displayName}&nbsp;&nbsp;
              </span>)
            })
          }
          {
            type === 'checkbox' &&
            checkboxData.map((item: any, index: number) => {
              return (<span key={index}>
                <input
                  key={index}
                  type='checkbox'
                  name={item.name}
                  value={item.value}
                  defaultChecked={item.checked}
                  onChange={this.handleCheckboxChange.bind(this)}
                />&nbsp;&nbsp;{item.displayName}&nbsp;&nbsp;
              </span>)
            })
          }
          {showMessage && <div className={`${defaultCls}-explain`}>{rules && rules.message}</div>}
        </div>
      </div>
    )
  }
}
