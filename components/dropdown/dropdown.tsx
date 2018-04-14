import ClassNames from 'classnames'
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
  className?: string
  style?: React.CSSProperties
  filter?: boolean
  callBack?: (item: T) => void
  setFields?: {key: string, title: string}
  prePend?: object
  title?: string
}

export interface MyStates {
  visible: boolean
  data: T[]
  dataTmp: T[]
  title?: string
  selectedIndex: number
  filterVal: string
}
export default class extends React.Component<MyProps, MyStates> {
  public pageNum = 20
  public t: any
  public allData: T[]
  public defaultCls = 'pilipa-dropdown'
  public defaultPage = 1
  public selectedIndex = -1
  public seleted = false
  public event: any
  public filterVal: string = ''
  public constructor (props: MyProps) {
    super(props)
    this.handleAllData(this.props.data)
    this.state = {
      visible: false,
      title: this.props.title || '',
      data: this.allData.slice(0, this.pageNum * this.defaultPage),
      dataTmp: this.allData,
      selectedIndex: this.selectedIndex,
      filterVal: ''
    }
  }
  public componentWillReceiveProps (props: MyProps) {
    if (props.data) {
      this.handleAllData(props.data)
      const res = this.filterData()
      this.setState({
        data: res.slice(0, this.pageNum * this.defaultPage),
        dataTmp: res
      })
    }
  }
  public componentDidMount () {
    const $dropdowm = $(this.refs.dropdown)
    const { button } = this.refs
    $(button).hover(() => {
      this.handleEnter()
    }, (e) => {
      this.handleLeave()
    })
    // $(document).on('click', (event) => {
    //   console.log('click')
    //   if($dropdowm.find(event.target).length === 0) {
    //     this.handleLeave()
    //   }
    // })
    $(document).keydown((event) => {
      this.onKeyDown(event)
    })
    $(document).keyup(() => {
      if (this.event) {
        this.event.returnValue = false
      }
    })
  }
  public componentWillUnmount () {
    if (this.t) {
      clearTimeout(this.t)
    }
    console.log('will unmount')
  }
  public onKeyDown (event: any) {
    this.event = event
    const $dropdowm = $(this.refs.dropdown)
    const keyCode = event.keyCode
    let { selectedIndex } = this.state
    const $items = $dropdowm.find('.results .items')
    const $lis = $items.find('li')
    const { data } = this.state
    if ($lis.length === 0 || $lis.eq(selectedIndex).length === 0) {
      return
    }
    const scrollTop = $items.scrollTop()
    const itemsHeight = $items.height()
    let liOffsetTop = 0
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
    const { key, title } = this.props.setFields || {key: '', title: ''}
    const selectTitle = this.props.title
    data = this.props.prePend === undefined ? data : [this.props.prePend].concat(data)
    this.allData = []
    data.map((item, index) => {
      const newItem: T = {
        key: item[key || 'key'],
        title: item[title || 'title'],
        capital: getCapital(item[title || 'title']) || ['']
      }
      if (this.props.title === item[title || 'title']) {
        this.defaultPage = index === 0 ? 1 : Math.ceil(index + 1 / this.pageNum)
        this.selectedIndex = index
      }
      this.allData[index] = newItem
    })
  }
  // 滚动到选中的位置
  public scrollToSelectedPos () {
    const $dropdowm = $(this.refs.dropdown)
    const $items = $dropdowm.find('.results .items')
    this.state.dataTmp.map((item, index) => {
      if (this.state.title === item.title) {
        this.selectedIndex = index
        this.defaultPage = this.selectedIndex <= 0 ? 1 : Math.ceil(this.selectedIndex + 1 / this.pageNum)
        this.setState({
          data: this.state.dataTmp.slice(0, this.defaultPage * this.pageNum),
          selectedIndex: index
        })
        return false
      }
    })
    if (this.selectedIndex < 0) {
      $items.scrollTop(0)
      return
    }
    this.defaultPage = this.selectedIndex <= 0 ? 1 : Math.ceil(this.selectedIndex + 1 / this.pageNum)
    // this.setState({
    //   data: this.allData.slice(0, this.defaultPage * this.pageNum),
    //   dataTmp: this.allData
    // })
    if ($items.find('li').length === 0) {
      return
    }
    try {
      const scrollTop = $items.find('li').eq(this.selectedIndex)[0].offsetTop
      console.log($items.find('li').eq(this.selectedIndex)[0].offsetTop)
      $items.scrollTop(scrollTop - $items.find('li').eq(this.selectedIndex)[0].clientHeight * 3)
    } catch (e) {
      this.selectedIndex = 0
      const scrollTop = $items.find('li').eq(this.selectedIndex)[0].offsetTop
      console.log($items.find('li').eq(this.selectedIndex)[0].offsetTop)
      $items.scrollTop(scrollTop - $items.find('li').eq(this.selectedIndex)[0].clientHeight * 3)
    }
  }
  public handleEnter () {
    if (this.t) {
      clearTimeout(this.t)
    }
    let { results } = this.refs
    if (results) {
      this.scrollToSelectedPos()
      $(results).removeClass('custom-slide-up-leave')
      $(results).one('mouseover', () => {
        if (this.t) {
          clearTimeout(this.t)
        }
      })
      $(results).one('mouseleave', () => {
        this.handleLeave()
      })
      return
    }
    this.setState({
      visible: true
    }, () => {
      this.scrollToSelectedPos()
      results = this.refs.results
      $(results).removeClass('custom-slide-up-leave')
      $(results).addClass('custom-slide-up-enter')
      this.t = setTimeout(() => {
        $(results).removeClass('custom-slide-up-enter')
      }, 200)
      $(results).one('mouseover', () => {
        clearTimeout(this.t)
      })
      $(results).one('mouseleave', () => {
        this.handleLeave()
      })
      this.onItemScroll()
    })
  }
  public onItemScroll () {
    const results = this.refs.results
    $(results).children('.items').scroll((e) => {
      const scrollTop = e.target.scrollTop
      const h = $(results).find('ul').height()
      const ch = e.target.clientHeight
      // 显示区域离底部小于10px的时候
      // console.log(scrollTop + ch - h, h , scrollTop + ch > h - 10)
      console.log(this.defaultPage, 'defaultPage')
      if (scrollTop + ch > h - 10) {
        if (this.defaultPage < Math.ceil(this.state.dataTmp.length / this.pageNum)) {
          this.defaultPage += 1
          // console.log(this.defaultPage, 'defaultPage')
          this.setState({
            data: this.state.dataTmp.slice(0, this.defaultPage * this.pageNum)
          })
        }
      }
    })
  }
  public handleLeave () {
    if (this.t) {
      clearTimeout(this.t)
    }
    const { button, results } = this.refs
    this.t = setTimeout(() => {
      $(results).addClass('custom-slide-up-leave')
      this.t = setTimeout(() => {
        $(results).removeClass('custom-slide-up-leave')
        $(results).addClass('hidden')
        this.defaultPage = this.selectedIndex <= 0 ? 1 : Math.ceil(this.selectedIndex + 1 / this.pageNum)
        this.setState({
          visible: false,
          selectedIndex: this.selectedIndex
          // data: this.allData.slice(0, this.defaultPage * this.pageNum),
          // dataTmp: this.allData
        })
        this.seleted = false
      }, 200)
    }, 100)
  }
  public handleClick (item: {key: number, title: string}, index: number) {
    this.seleted = true
    this.selectedIndex = index
    const { callBack } = this.props
    this.setState({
      title: item.title,
      selectedIndex: index
    })
    this.defaultPage = index === 0 ? 1 : Math.ceil(index + 1 / this.pageNum)
    this.handleLeave()
    if (callBack) {
      setTimeout(() => {
        callBack(item)
      }, 301)
    }
  }
  public filterData () {
    const { allData } = this
    if (this.filterVal === '') {
      return allData
    }
    let pattern: RegExp = null
    try {
      pattern = new RegExp(this.filterVal, 'i')
    } catch (e) {
      console.log(e.message)
      pattern = new RegExp('', 'i')
    }
    const res = allData.filter((item: T, index): boolean => {
      if (pattern.test(item.title) || pattern.test(item.capital.join(','))) {
        return true
      }
    })
    return res || []
  }
  public handleChange (e: any) {
    const $items = $(this.refs.results).find('.items')
    this.filterVal = e.target.value
    const { allData } = this
    const value: string = $(this.refs.input).val().toString()
    const res = this.filterData()
    $items.scrollTop(0)
    res.map((item, index) => {
      if (this.state.title === item.title) {
        this.selectedIndex = index
        return false
      }
    })
    this.defaultPage = 1
    this.setState({
      data: res.slice(0, this.pageNum),
      dataTmp: res,
      selectedIndex: -1,
      filterVal: this.filterVal
    })
  }
  public onMouseEnter (key: number) {
    if (this.seleted) {
      return
    }
    this.setState({
      selectedIndex: key
    })
  }
  public render () {
    const { className, style, filter } = this.props
    const { visible, data } = this.state
    // console.log(data, 'render')
    let { title } = this.state
    title = title || this.allData.length && this.allData[0].title || ''
    return (
      <div className={ClassNames(this.defaultCls, className)} style={style} ref='dropdown'>
        <div className='costom-btn-group' ref='button'>
          <div className='btn-left'><span title={title}>{title}</span></div>
          <div className='btn-right'>
            <i className='fa fa-chevron-down' aria-hidden='true'></i>
          </div>
        </div>
        {visible && <div className='results' ref='results'>
          {
            filter &&
            <input
              className='input'
              value={this.state.filterVal}
              onChange={this.handleChange.bind(this)}
              ref='input'
            />
          }
          {data.length === 0 && <p>未搜到结果</p>}
          <div className='items'>
            <ul>
              {data.length > 0 && data.map((item: T, key: number) => {
                return (
                  <li
                    key={key}
                    className={ClassNames({
                      active: key === this.state.selectedIndex,
                      selected: key === this.selectedIndex
                    })}
                    title={item.title}
                    onClick={this.handleClick.bind(this, item, key)}
                    onMouseEnter={this.onMouseEnter.bind(this, key)}
                  >
                    {item.title}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>}
      </div>
    )
  }
}
