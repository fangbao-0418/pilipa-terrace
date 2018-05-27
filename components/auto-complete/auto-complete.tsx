import classNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import { getCapital } from '../_util'
export interface T {
  title: string
  key: any
  capital?: string[]
}
export interface MyProps {
  data: any[]
  onSelect?: (item: T) => void
  onChange?: (item: T) => void
  className?: string
  placeholder?: string
  style?: React.CSSProperties
  setFields?: {key: string, title: string}
  defaultValue?: any
}
export interface MyStates {
  data: T[]
  dataTmp: T[]
  page: number
  visible: boolean
  hover: boolean
  selectedIndex: number
  value: string
}

class AutoComplete extends React.Component<MyProps, MyStates> {
  public pageNum = 20
  public allData: T[] = []
  public defaultCls = 'pilipa-auto-complete'
  public event: any
  public filterVal: string = ''
  constructor (props: MyProps) {
    super(props)
    this.handleAllData(this.props.data)
    this.state = {
      data: this.allData.slice(0, this.pageNum),
      dataTmp: this.allData,
      page: 1,
      visible: false,
      hover: false,
      selectedIndex: -1,
      value: this.getDefaultValue()
    }
  }
  public componentWillReceiveProps (props: MyProps) {
    if (props.data.length) {
      this.handleAllData(props.data)
      // const res = this.filterData()
      this.setState({
        data: this.allData.slice(0, this.pageNum),
        dataTmp: this.allData,
        page: 1
      })
    }
  }
  public componentDidMount () {
    $(this.refs.input).off('click')
    $(this.refs.input).click(() => {
      if (this.state.visible) {
        return
      }
      this.searchShow()
    })
    $(document).keydown((event) => {
      this.onKeyDown(event)
    })
    $(document).keyup(() => {
      if (this.event) {
        this.event.returnValue = false
      }
    })
  }
  public getDefaultValue () {
    let value = ''
    const { defaultValue, setFields } = this.props
    if (typeof defaultValue !== 'object') {
      return defaultValue || ''
    }
    value = setFields ? defaultValue[setFields.title] : defaultValue.title
    return value
  }
  public onKeyDown (event?: any) {
    this.event = event
    const $results = $(this.refs.results)
    const $items = $results.find('.items')
    const $lis = $results.find('.items li')
    const keyCode = event.keyCode
    const { data } = this.state
    let { selectedIndex } = this.state
    let liOffsetTop = 0
    const scrollTop = $items.scrollTop()
    const itemsHeight = $items.height()
    if ($lis.length === 0 || $lis.eq(selectedIndex).length === 0) {
      return
    }
    switch (keyCode) {
    // 回车
    case 13:
      $lis.eq(this.state.selectedIndex).trigger('click')
      break
    // ↑
    case 38:
      event.preventDefault()
      selectedIndex = selectedIndex <= 0 ? 0 : selectedIndex - 1
      liOffsetTop = $lis.eq(selectedIndex)[0].offsetTop
      if (scrollTop > liOffsetTop) {
        $items.scrollTop(liOffsetTop)
      }
      this.setState({
        selectedIndex
      })
      break
    // ↓
    case 40:
      event.preventDefault()
      selectedIndex = selectedIndex >= data.length - 1 ? data.length - 1 : selectedIndex + 1
      liOffsetTop = $lis.eq(selectedIndex)[0].offsetTop
      if (scrollTop + itemsHeight - $lis.eq(selectedIndex).height() < liOffsetTop) {
        $items.scrollTop(scrollTop + $lis.eq(selectedIndex)[0].clientHeight)
      }
      this.setState({
        selectedIndex
      })
      break
    }
  }
  public handleAllData (data: any[]) {
    const { key, title } = this.props.setFields || {key: 'key', title: 'title'}
    this.allData = []
    data.map((item, index) => {
      const newItem: T = {
        key: item[key],
        title: item[title],
        capital: getCapital<string>(item[title]) || ['']
      }
      this.allData[index] = newItem
    })
  }
  public searchChange (e: any) {
    const $items = $(this.refs.results).find('.items')
    const value = e.target.value
    this.setState({
      value
    }, () => {
      $items.scrollTop(0)
      this.searchShow()
    })
  }
  public filterData () {
    const { allData } = this
    if (this.filterVal === '') {
      return this.allData
    }
    let pattern: RegExp = null
    try {
      pattern = new RegExp(this.filterVal, 'i')
    } catch (e) {
      pattern = new RegExp('', 'i')
    }
    const res = allData.filter((item: T): boolean => {
      if (pattern.test(item.title) || pattern.test(item.capital.join(','))) {
        return true
      }
    })
    return res || []
  }
  public searchShow () {
    const { allData } = this
    const el = $(this.refs.input)
    this.filterVal = el.val().toString() || ''
    const res = this.filterData()
    this.setState({
      data: res.slice(0, this.pageNum),
      dataTmp: res,
      visible: true,
      page: 1,
      selectedIndex: -1
    }, () => {
      this.listenScroll()
      const results = this.refs.results
      $(results).addClass('custom-slide-up-enter')
      setTimeout(() => {
        $(results).addClass('custom-slide-up-enter')
      }, 300)
      el.off('blur')
      $(results).off('blur')
      $(results).hover(() => {
        this.setState({
          hover: true
        })
      }, () => {
        this.setState({
          hover: false
        })
      })
      el.blur(() => {
        if (!this.state.hover) {
          $(results).addClass('custom-slide-up-leave')
          setTimeout(() => {
            $(results).removeClass('custom-slide-up-leave')
            this.setState({
              visible: false
            })
          }, 300)
        }
      })
    })
  }
  public handleSelect (item: T) {
    this.setState({
      value: item.title
    })
    $(this.refs.input).val(item.title)
    const results = this.refs.results
    const { onSelect, onChange } = this.props
    $(results).addClass('custom-slide-up-leave')
    setTimeout(() => {
      $(results).removeClass('custom-slide-up-leave')
      this.setState({
        visible: false
      })
    }, 300)
    if (onSelect) {
      onSelect(item)
    }
    if (onChange) {
      onChange(item)
    }
  }
  public listenScroll () {
    const results = this.refs.results
    $(results).children('.items').off('scroll')
    $(results).children('.items').scroll((e) => {
      const scrollTop = e.target.scrollTop
      const h = $(results).find('ul').height()
      const ch = e.target.clientHeight
      if (scrollTop + ch > h - 10) {
        if (this.state.page < Math.ceil(this.state.dataTmp.length / this.pageNum)) {
          this.setState({
            page: this.state.page + 1,
            data: this.state.dataTmp.slice(0, this.pageNum * (this.state.page + 1))
          })
        }
      }
    })
  }
  public render () {
    const { data, value, visible } = this.state
    const { className, placeholder } = this.props
    return (
      <div className={classNames(this.defaultCls, className)} style={this.props.style}>
        <input
          type='text'
          placeholder={placeholder}
          onChange={this.searchChange.bind(this)}
          ref='input'
          value={value}
        />
        {visible &&
          <div className='results' ref='results'>
            {data.length === 0 && <p>未搜到结果</p>}
            <div className='items'>
              <ul>
                {
                  data && data.map((item, index) => {
                    return (
                      <li
                        onClick={this.handleSelect.bind(this, item)}
                        key={'auto-complete-' + index}
                        title={item.title}
                        className={classNames({
                          active: this.state.selectedIndex === index
                        })}
                        onMouseEnter={() => {
                          this.setState({
                            selectedIndex: index
                          })
                        }}
                      >
                        <span>{item.title}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default AutoComplete
