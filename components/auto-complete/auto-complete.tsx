import classNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import { getCapital } from '../_util'
export interface T {
  title: string
  key: number | ''
  capital?: string[]
}
export interface MyProps {
  data: any[]
  onSelect?: (value: string) => any
  className?: string
  placeholder?: string
  style?: React.CSSProperties
  setFields?: {key: string, title: string}
}
export interface MyStates {
  data: T[]
  dataTmp: T[]
  page: number
  visible: boolean
  hover: boolean
  selectedIndex: number
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
      selectedIndex: -1
    }
  }
  public componentWillReceiveProps (props: MyProps) {
    if (props.data.length) {
      this.handleAllData(props.data)
      const res = this.filterData()
      this.setState({
        data: res.slice(0, this.state.page * this.pageNum),
        dataTmp: res
      })
    }
  }
  public componentDidMount () {
    $(this.refs.input).off('click')
    $(this.refs.input).click(() => {
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
  public onKeyUp () {

  }
  public handleAllData (data: any[]) {
    const { key, title } = this.props.setFields || {key: '', title: ''}
    this.allData = []
    data.map((item, index) => {
      const newItem: T = {
        key: item[key || 'key'],
        title: item[title || 'title'],
        capital: getCapital<string>(item[title || 'title']) || ['']
      }
      this.allData[index] = newItem
    })
  }
  public searchChange () {
    const $items = $(this.refs.results).find('.items')
    const el = $(this.refs.input)
    const value: string = el.val().toString() || ''
    $items.scrollTop(0)
    if (!value) {
      this.setState({
        visible: false
      })
    } else {
      this.searchShow()
    }
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
  public handleSelect (item: any) {
    $(this.refs.input).val(item.title)
    const results = this.refs.results
    $(results).addClass('custom-slide-up-leave')
    setTimeout(() => {
      $(results).removeClass('custom-slide-up-leave')
      this.setState({
        visible: false
      })
    }, 300)
    if (this.props.onSelect) {
      this.props.onSelect(item)
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
    const { data, visible } = this.state
    const { className, placeholder } = this.props
    return (
      <div className={classNames(this.defaultCls, className)} style={this.props.style}>
        <input type='text' placeholder={placeholder} onChange={this.searchChange.bind(this)} ref='input' />
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
                        {item.title}
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
