import ClassNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import DropDown from '../dropdown'
import Bus from './bus'

export interface FormItemProps {
  className?: string
  style?: React.CSSProperties
  required?: boolean
  requiredMsg?: string
  type?: string
  label?: string
  semicolon?: boolean
  children?: any
  rules?: any
  field?: string
  value?: any
  placeholder?: string
  data?: any
  checkboxData?: any
  getField?: any
  labelCol?: any
  wrapperCol?: any
  defaultValue?: any
  title?: string
  onChange?: (event: any, value?: any) => any
}
export interface FormItemState {
  inputValue?: string | number
  showMessage: boolean
  checkboxData: any
}
class FormItem extends React.Component<FormItemProps, FormItemState> {
  public defaultCls = 'pilipa-form-item'
  public constructor (props: FormItemProps) {
    super(props)
    this.state = {
      showMessage: false,
      inputValue: '',
      checkboxData: []
    }
  }
  public componentWillMount () {
    const {props} = this
    const {value, type, defaultValue} = props
    Bus.trigger('getField', props)
    this.setState({inputValue: value})
    if (type === 'checkbox') {
      this.setState({checkboxData: defaultValue})
    }
  }
  public componentDidMount () {
  }
  public componentWillReceiveProps (nextProps: any) {
  }
  public handleInputChange (e: any) {
    const fieldName = e.target.name
    const {required, onChange} = this.props
    const self = this
    self.setState({inputValue: e.target.value}, () => {
      if (required && self.state.inputValue === '') {
        self.setState({showMessage: true})
      } else {
        self.setState({showMessage: false})
      }
      if (onChange) {onChange(e)}
      Bus.trigger('formDataChange', {
        name: fieldName,
        value: self.state.inputValue
      })
    })
  }
  public handleSelectChange (e: any) {
    const {required, onChange} = this.props
    if (required && e.target.value === '') {
      this.setState({showMessage: true})
    } else {
      this.setState({showMessage: false})
    }
    if (onChange) {onChange(e)}
    Bus.trigger('formDataChange', {
      name: e.target.name,
      value: e.target.value
    })
  }
  public handleRadioChange (e: any) {
    const {required, onChange} = this.props
    if (required && e.target.value === '') {
      this.setState({showMessage: true})
    } else {
      this.setState({showMessage: false})
    }
    if (onChange) {onChange(e)}
    Bus.trigger('formDataChange', {
      name: e.target.name,
      value: e.target.value
    })
  }
  public handleCheckboxChange (event: any) {
    const {onChange} = this.props
    const {checkboxData} = this.state
    const dataTemp = $.extend(true, checkboxData, [])
    const index = dataTemp.indexOf(event.target.value)
    if (index === -1) {
      dataTemp.push(event.target.value)
    } else {
      dataTemp.splice(index, 1)
    }
    this.setState({checkboxData: dataTemp},() => {
      // console.log(this.state.checkboxData)
      if (onChange) {onChange(event, dataTemp)}
      Bus.trigger('formDataChange', {name: this.props.field, value: dataTemp})
    })
  }
  public handleDropDownChange (item: any) {
    const {onChange} = this.props
    if (onChange) {onChange(item)}
    Bus.trigger('formDataChange', {
      name: this.props.field,
      value: item.title,
      id: item.key
    })
  }
  public render () {
    const {defaultCls, props, state} = this
    const {children, className, style, type, label, semicolon, field, value,
      placeholder, data, rules, required, requiredMsg,
      labelCol, wrapperCol, defaultValue, title, onChange} = props
    const {showMessage, inputValue, checkboxData} = state
    const labelClassName = labelCol ?
      ClassNames(`${defaultCls}-label`, {[`col-${labelCol}`]: true}) :
      `${defaultCls}-label`
    const wrapperClassName = wrapperCol ?
      ClassNames(`${defaultCls}-control-wrapper`, {[`has-error`]: showMessage}, {[`col-${wrapperCol}`]: true}) :
      ClassNames(`${defaultCls}-control-wrapper`, {[`has-error`]: showMessage})
    const self = this
    return (
       <div key='formItem' className={ClassNames(defaultCls, className)} style={style}>
        {children}
        {
          label &&
          <div className={labelClassName}>
            <label
              title={label}
              className={ClassNames(
                {[`${defaultCls}-required`]: (required)}
              )}
            >{label}
            </label>
          </div>
        }
        <div className={wrapperClassName}>
          {
            type === 'input' &&
            <input
              name={field}
              placeholder={placeholder}
              onChange={(e) => this.handleInputChange(e)}
              value={inputValue}
            />
          }
          {
            (type === 'select' && data.length) &&
            <select
              name={field}
              onChange={this.handleSelectChange.bind(this)}
              defaultValue={defaultValue}
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
              return (<span key={index} className='wrap-radio'>
            <input
              type='radio'
              id={item.value}
              name={item.name}
              value={item.value}
              defaultChecked={defaultValue === item.value}
              onChange={this.handleRadioChange.bind(this)}
            />&nbsp;<label htmlFor={item.value}>{item.displayName}</label>&nbsp;&nbsp;
          </span>)
            })
          }
          {
            (type === 'checkbox' && data.length) &&
            data.map((item: any, index: number) => {
              let checked = false
              if (checkboxData && checkboxData.length) {
                checkboxData.map((defaultValueItem: any, defaultValueIndex: number) => {
                  if (item.value === defaultValueItem) {
                    checked = true
                  }
                })
              }
              return (<span key={index} className='wrap-checkBox'>
            <input
              key={index}
              type='checkbox'
              name={item.name}
              id={item.value}
              value={item.value}
              defaultChecked={checked}
              onChange={this.handleCheckboxChange.bind(this)}
            />&nbsp;<label htmlFor={item.value}>{item.displayName}</label>&nbsp;&nbsp;
          </span>)
            })
          }
          {
            type === 'dropdown' &&
            <DropDown
              data={data}
              callBack={this.handleDropDownChange.bind(this)}
              setFields={{key: 'key', title: 'value'}}
              title={title}
            />
          }
          {showMessage &&
          <div className={`${defaultCls}-explain`}>{requiredMsg ? requiredMsg : `${label}不能为空`}</div>}
        </div>
      </div>
    )
  }
}

export default FormItem
