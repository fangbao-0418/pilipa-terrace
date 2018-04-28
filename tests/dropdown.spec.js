/* global describe, it, xit, expect, singlequote: false */
import { mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import '../dist/pilipa.min.css'
import { DropDown } from '../components'
import { createKeyboardEvent } from './utils/events'
const data = []
let i = 0
while (i < 200) {
  data.push({
    title: `测试数据${i}`,
    key: i
  })
  i++
}
class Container extends React.Component {
  constructor () {
    super()
    this.state = {
      data: data.slice(0, 20),
      title: ''
    }
  }
  render () {
    return (
      <DropDown
        title={this.state.title}
        ref='dropdown'
        data={this.state.data}
        filter
        className='mt-20'
        style={{float: 'left', marginLeft: '20px'}}
      >
      </DropDown>
    )
  }
}
describe('test dropdown component', () => {
  it('test dropdown dom', () => {
    const data = [{
      title: '测试1',
      key: 0
    }]
    const wrapper = mount(
      <DropDown
        data={data}
        filter
        className='mt-20'
        style={{marginLeft: '20px'}}
      >
      </DropDown>
    )
    expect(wrapper.find('.pilipa-dropdown').length).toBe(1)
    expect(wrapper.state('title')).toBe('')
    wrapper.simulate('mouseover')
    $(wrapper.ref('button')).trigger('mouseover')
    expect(wrapper.state('visible')).toBe(true)
    expect(wrapper.state('data') instanceof Array).toBeTruthy()
    expect(wrapper.state('data').length).toBe(1)
    expect($(wrapper.ref('results')).find('ul li').length).toBe(1)
  })
  it('test dropdown param is empty', () => {
    const data = []
    const wrapper = mount(
      <DropDown
        filter
      >
      </DropDown>
    )
    expect(wrapper.find('.pilipa-dropdown').length).toBe(1)
    expect(wrapper.state('title')).toBe('')
    wrapper.simulate('mouseover')
    $(wrapper.ref('button')).trigger('mouseover')
    expect(wrapper.state('visible')).toBe(true)
    expect(wrapper.prop('data')).toBe(undefined)
    expect(wrapper.state('data') instanceof Array).toBeTruthy()
    expect(wrapper.state('data').length).toBe(0)
    expect($(wrapper.ref('results')).find('p').text().trim()).toBe('未搜到结果')
  })
  it('test dropdown data change', () => {
    const wrapper = mount(<Container />)
    const dropdown = wrapper.ref('dropdown')
    expect(dropdown.props.data.length).toBe(20)
    wrapper.setState({
      data
    })
    expect(dropdown.props.data.length).toBe(200)
    $(dropdown.refs.button).trigger('mouseover')
    expect($(dropdown.refs.results).find('ul li').length).toBe(20)
    sinon.spy(dropdown, 'componentWillReceiveProps')
    sinon.spy(dropdown, 'handleAllData')
    sinon.spy(dropdown, 'render')
    wrapper.setState({
      title: '测试数据55'
    })
    const spyCall = dropdown.componentWillReceiveProps.getCall(0)
    expect(spyCall.calledOn(dropdown)).toBeTruthy()
    expect(spyCall.calledOn())
    expect(dropdown.componentWillReceiveProps.calledWithMatch({title: '测试数据55', data})).toBeTruthy()
    expect(dropdown.handleAllData.callCount).toBe(1)
    expect(dropdown.render.callCount).toBe(1)
    expect(dropdown.props.title).toBe('测试数据55')
    expect(dropdown.defaultPage).toBe(3)
    expect(dropdown.props.data.length).toBe(200)
    expect(dropdown.state.data.length).toBe(60)
    $(dropdown.refs.button).trigger('mouseover')
    wrapper.setState({
      title: '测试数据66'
    })
    expect(dropdown.state.data.length).toBe(80)
  })
  it('test dropdown search', () => {
    const wrapper = mount(<Container />)
    const dropdown = wrapper.ref('dropdown')
    sinon.spy(dropdown, 'handleChange')
    sinon.spy(dropdown, 'render')
    $(dropdown.refs.button).trigger('mouseover')
    expect(dropdown.render.calledOn(dropdown)).toBeTruthy()
    wrapper.update()
    expect(dropdown.state.visible).toBe(true)
    expect(wrapper.find('.input').length).toBe(1)
    wrapper.find('.input').getDOMNode().value = '测试数据1'
    wrapper.find('.input').simulate('change')
    expect(dropdown.handleChange.calledOn(dropdown)).toBeTruthy()
    expect(dropdown.state.data.length).toBe(11)
  })
  it('test dropdown keydown down key', () => {
    const wrapper = mount(<Container />)
    wrapper.setState({
      data
    })
    $('body').html(wrapper.getDOMNode())
    let dropdown = wrapper.ref('dropdown')
    sinon.spy(dropdown, 'onKeyDown')
    sinon.spy(dropdown, 'setState')
    sinon.spy(dropdown, 'render')
    $(dropdown.refs.button).trigger('mouseover')
    // ↓
    const evtObj = createKeyboardEvent('keydown', 40)
    document.dispatchEvent(evtObj)
    expect(dropdown.onKeyDown.calledOn(dropdown)).toBe(true)
    expect(dropdown.render.calledOn(dropdown)).toBe(true)
    expect(dropdown.setState.calledOn(dropdown)).toBe(true)
    expect(dropdown.setState.calledWith({selectedIndex: 0})).toBe(true)
    expect(dropdown.state.selectedIndex).toBe(0)
    document.dispatchEvent(evtObj)
    document.dispatchEvent(evtObj)
    document.dispatchEvent(evtObj)
    expect(dropdown.render.callCount).toBe(5)
    expect(dropdown.state.selectedIndex).toBe(3)
    let index = 0
    let t = 0
    // ↓
    function simulateKeyDown40 () {
      t = setInterval(() => {
        if (index === 210) {
          clearInterval(t)
          expect(dropdown.state.data.length).toBe(200)
          expect(dropdown.state.selectedIndex).toBe(199)
        }
        document.dispatchEvent(evtObj)
        index++
      }, 100)
    }
    // 连续按↓键
    simulateKeyDown40()
    // // 连续按↑键
    // function simulateKeyDown38 (done) {
    //   let t = 0
    //   console.log('xxx')
    //   index = 0
    //   const evtObj2 = createKeyboardEvent('keydown', 38)
    //   t = setInterval(() => {
    //     if (index === 50) {
    //       clearInterval(t)
    //       console.log(index, 'index')
    //       // expect(dropdown.state.data.length).toBe(60)
    //       // expect(dropdown.state.selectedIndex).toBe(53)
    //     }
    //     console.log(dropdown.state.selectedIndex, 'si')
    //     document.dispatchEvent(evtObj2)
    //     index++
    //   }, 10)
    // }
  })
})
