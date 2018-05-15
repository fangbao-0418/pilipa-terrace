import ClassNames from 'classnames'
import $ from 'jquery'
import React, {Children, cloneElement} from 'react'
import Bus from './bus'
import FormItem from './FormItem'

export interface FormProps {
  className?: string
  style?: React.CSSProperties
  children?: Array<React.ReactElement<any>>
  column?: number
  layout?: string
  onSubmit?: React.FormEventHandler<any>
  onFormChange?: (value: any) => any
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
    Bus.on('getField', this.getField.bind(this))
    Bus.on('formDataChange', this.formDataChange.bind(this))
  }
  public componentDidMount () {
  }
  public getField = (e: any) => {
    const data = $.extend(true, this.state.formData, [])
    const item = $.extend(true, e, [])

    const dataForm: any = {}
    if (data.length !== undefined) {
      data.push(item)
    } else {
      return
    }
    data.map((every: any, index: number) => {
      if (every.field) {
        if (every.defaultValue) {
          dataForm[every.field] = every.defaultValue
          return
        }
        if (every.title) {
          dataForm[every.field] = every.title
          return
        }
        if (every.data && every.data.length > 0) {
          let tempVal: any = every.type === 'checkbox' ? [] : null
          every.data.map((dataItem: any) => {
            if (dataItem.checked) {
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
  public handleFormSubmit = (e: any) => {
    e.preventDefault()
    console.log('submit', this.state.formData)
    const {onSubmit} = this.props
    if (onSubmit) {onSubmit(this.state.formData)}
  }

  public formDataChange = (e: any) => {
    // console.log('change', e)
    const {formData} = this.state
    const data = $.extend(true, formData, {})
    for (const key of Object.keys(data)) {
      if (key === e.name) {
        data[key] = e.value
      }
    }
    this.setState({formData: data}, () => {
      const {onFormChange} = this.props
      if (onFormChange) {onFormChange(this.state.formData)}
      console.log('formData', this.state.formData)
    })
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
    const mapChildren = (child: any) => {
      console.log(child)
      const childProps = child.props
      const type = child.type
      if (type !== FormItem) {
        if (childProps && childProps.children) {
          Children.map(childProps.children, (item: any, index: number) => {
            console.log(item.type)
            if (item.type !== FormItem) {
              item = cloneElement(item as React.ReactElement<any>,
                {formDataChange: this.formDataChange, getField: this.getField})
              mapChildren(item)
            }
          })
        }
      }
    }
    return (
      <form
        className={formClassName}
        style={style}
        onSubmit={(e: any) => this.handleFormSubmit(e)}
      >
        {/*<myContext.Provider value={{formDataChange: this.formDataChange, getField: this.getField}}>*/}
        {children}
        {/*</myContext.Provider>*/}
      </form>
    )
  }
}
