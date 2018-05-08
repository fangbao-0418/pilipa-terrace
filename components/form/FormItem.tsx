import ClassNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import DropDown from '../dropdown'
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
  value?: any
  placeholder?: string
  data?: any
  formDataChange?: any
  checkboxData?: any
  getField?: any
  labelCol?: any
  wrapperCol?: any
  defaultValue?: string
}
export interface FormItemState {
  inputValue?: string | number
  showMessage: boolean
  checkboxData: any
}
export default class FormItem extends React.Component<FormItemProps, FormItemState> {
  public defaultCls = 'pilipa-form-item'

  public constructor (props: FormItemProps) {
    super(props)
    this.state = {
      showMessage: false,
      checkboxData: [],
      inputValue: ''
    }
  }
  public componentWillMount () {
    const {props} = this
    const {value} = props
    this.setState({inputValue: value})
    this.props.getField(props)
    if (props.type === 'checkbox') {
      this.setState({checkboxData: props.data})
    }
  }
  public componentDidMount () {
  }
  public componentWillReceiveProps (nextProps: any) {
  }
  public handleInputChange (e: any) {
    const {name, value} = e.target
    this.setState({inputValue: value}, () => {
      const {rules} = this.props
      if (rules && rules.required && value === '') {
        this.setState({showMessage: true})
      } else {
        this.setState({showMessage: false})
      }
      const data = {
        name,
        value: this.state.inputValue
      }
      this.props.formDataChange(data)
    })
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
    const data = $.extend(true, checkboxData, [])
    data.map((item: any, index: number) => {
      if (event.target.value === item.value) {
        data[index].checked = !item.checked
      }
    })
    this.setState({checkboxData: data},() => {
      const arr: any = []
      data.map((item: any, index: number) => {
        if (item.checked) {
          arr.push(item.value)
        }
      })
      this.props.formDataChange({name: this.props.field, value: arr})
    })
  }
  public handleDropDownChange (item: any, field: string) {
    const data = {
      name: this.props.field,
      value: item.title,
      id: item.key
    }
    this.props.formDataChange(data)
  }
  public render () {
    const {defaultCls, props, state} = this
    const {children, className, style, type, label, semicolon, field, value,
      placeholder, data, rules,
      labelCol, wrapperCol} = props
    const {showMessage, checkboxData, inputValue} = state
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
            <input
              name={field}
              placeholder={placeholder}
              onChange={this.handleInputChange.bind(this)}
              value={inputValue}
            />
          }
          {
            (type === 'select' && data.length) &&
            <select
              name={field}
              onChange={this.handleSelectChange.bind(this)}
              defaultValue={this.props.defaultValue}
            >
              {
                data.map((item: any, index: number) => {
                  console.log()
                  return <option
                    key={index}
                    value={item.value}
                  >
                    {item.name}
                  </option>
                })
              }
            </select>
          }
          {
            (type === 'radio' && data.length) &&
            data.map((item: any, index: number) => {
              return (<span key={index}>
                <label htmlFor={item.value}>{item.displayName}</label>&nbsp;&nbsp;
                <input
                  type='radio'
                  id={item.value}
                  name={item.name}
                  value={item.value}
                  defaultChecked={item.checked}
                  onChange={this.handleRadioChange.bind(this)}
                />&nbsp;&nbsp;
              </span>)
            })
          }
          {
            type === 'checkbox' &&
            checkboxData.map((item: any, index: number) => {
              return (<span key={index}>
                <label htmlFor={item.value}>{item.displayName}</label>&nbsp;&nbsp;
                <input
                  key={index}
                  type='checkbox'
                  name={item.name}
                  id={item.value}
                  value={item.value}
                  defaultChecked={item.checked}
                  onChange={this.handleCheckboxChange.bind(this)}
                />&nbsp;&nbsp;
              </span>)
            })
          }
          {
            type === 'dropdown' &&
              <DropDown
                data={data}
                callBack={this.handleDropDownChange.bind(this)}
                setFields={{key: 'key', title: 'value'}}
              />
          }
          {showMessage && <div className={`${defaultCls}-explain`}>{rules && rules.message}</div>}
        </div>
      </div>
    )
  }
}
