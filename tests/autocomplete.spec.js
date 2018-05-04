/* global describe, it, fit, xit, expect, afterEach, beforeEach, singlequote: false */
import { mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { AutoComplete } from '../components'
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
      <AutoComplete
        ref='autocomplete'
        data={this.state.data}
      >
      </AutoComplete>
    )
  }
}
describe('test auto-complete', () => {
  it('test auto-complete dom', () => {
    const wrapper = mount(
      <Container />
    )
    expect(wrapper.find('.pilipa-auto-complete').length).toBe(1)
  })
  it('test auto-complete dom', () => {
    const wrapper = mount(
      <Container />
    )
    const autoComplete = wrapper.ref('autocomplete')
    console.log(autoComplete.refs.input)
    expect(wrapper.find('.pilipa-auto-complete').length).toBe(1)
    expect(wrapper.find('input').length).toBe(1)
    expect(autoComplete.refs.input).toBeTruthy()
    expect(wrapper.state('data').length).toBe(20)
  })
  it('test auto-complete input focue', () => {
    const wrapper = mount(
      <Container />
    )
    const autoComplete = wrapper.ref('autocomplete')
    const $input = $(autoComplete.refs.input)
    sinon.spy(autoComplete, 'searchShow')
    $input.trigger('click')
    wrapper.update()
    expect(autoComplete.state.visible).toBe(true)
    expect(autoComplete.searchShow.calledOn(autoComplete)).toBeTruthy()
    expect(wrapper.find('li').length).toBe(20)
  })
})
