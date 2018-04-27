/* global describe, expect, it, xit, beforeEach, afterEach */
import React from 'react'
import sinon from 'sinon'
import { render, shallow, mount } from 'enzyme'
import { Modal } from '../components'

let m
describe('modal api', () => {
  afterEach(() => {
    $('.pilipa-modal').remove()
  })
  it('test modal show', () => {
    m = new Modal({
      title: 'xxx',
      content: 'xxx'
    })
    expect(m).toBeTruthy()
    expect(m.show).toBeTruthy()
    expect(m.hide).toBeTruthy()
    m.show()
    expect($('.pilipa-modal').length).toBe(1)
    expect($('.pilipa-modal .pilipa-modal-content').length).toBe(1)
    expect($('.pilipa-modal .pilipa-modal-body').text().trim()).toBe('xxx')
    expect($('.pilipa-modal-footer .pilipa-btn').length).toBe(2)
    expect($('.pilipa-modal-close').length).toBe(1)
  })
  it('test modal hide', (done) => {
    m = new Modal({
      title: 'xxx',
      content: 'xxx'
    })
    m.show()
    expect($('.pilipa-modal').length).toBe(1)
    m.hide()
    setTimeout(() => {
      expect($('.pilipa-modal').length).toBe(0)
      done()
    }, 200)
  })
  it('test modal close', (done) => {
    m = new Modal({
      title: 'xxx',
      content: 'xxx'
    })
    m.show()
    $('.pilipa-modal-close').trigger('click')
    setTimeout(() => {
      expect($('.pilipa-modal').length).toBe(0)
      done()
    }, 200)
  })
  it('test modal title', () => {
    m = new Modal({
      title: 'xxx',
      content: 'xxx'
    })
    m.show()
    expect($('.pilipa-modal-title').length).toBe(1)
    expect($('.pilipa-modal-title').text()).toBe('xxx')
    $('.pilipa-modal').remove()
    m = new Modal({
      title: <div className='modal-test-title'>demo</div>,
      content: 'xxx'
    })
    m.show()
    expect($('.pilipa-modal-title').text()).toBe('[object Object]')
  })
  it('test modal header', () => {
    m = new Modal({
      header: <p className='modal-test-title'>M</p>,
      content: 'xxx'
    })
    m.show()
    expect($('.modal-test-title').length).toBe(1)
    expect($('.modal-test-title').text()).toBe('M')
    $('.pilipa-modal').remove()
    m = new Modal({
      header: '<p class="modal-test-title">S</p>',
      content: 'xxx'
    })
    m.show()
    expect($('.modal-test-title').length).toBe(1)
    expect($('.modal-test-title').text()).toBe('S')
    $('.pilipa-modal').remove()
    m = new Modal({
      header: '<div>123</div>',
      content: 'xxx'
    })
    m.show()
    expect($('.pilipa-modal-header').text()).toBe('123')
    $('.pilipa-modal').remove()
    m = new Modal({
      header: 222,
      content: 'xxx'
    })
    m.show()
    expect($('.pilipa-modal-header').text()).toBe('222')
    $('.pilipa-modal').remove()
    m = new Modal({
      header: $('<span>xxx</span>'),
      content: 'xxx'
    })
    m.show()
    expect($('.pilipa-modal-header').children('span').length).toBe(1)
    expect($('.pilipa-modal-header span').text()).toBe('xxx')
    $('.pilipa-modal').remove()
    m = new Modal({
      header: null,
      content: 'xxx'
    })
    m.show()
    expect($('.pilipa-modal-header').length).toBe(0)
  })
  it('test modal onok', () => {
    const spy = sinon.spy()
    m = new Modal({
      header: $('<span>xxx</span>'),
      content: 'xxx',
      onOk: spy
    })
    m.show()
    $('.pilipa-modal-footer .pilipa-btn').eq(1).trigger('click')
    sinon.assert.calledOnce(spy)
  })
  it('test modal onCancel', (done) => {
    const spy = sinon.spy()
    m = new Modal({
      header: $('<span>xxx</span>'),
      content: 'xxx',
      onCancel: spy
    })
    m.show()
    $('.pilipa-modal-footer .pilipa-btn').eq(0).trigger('click')
    sinon.assert.calledOnce(spy)
    setTimeout(() => {
      expect($('.pilipa-modal').length).toBe(0)
      done()
    }, 200)
  })
  it('test modal style', () => {
    m = new Modal({
      header: $('<span>xxx</span>'),
      content: 'xxx',
      style: 'width: 100px;'
    })
    m.show()
    expect($('.pilipa-modal-content')[0].style.cssText).toBe('width: 100px;')
  })
  it('test modal className', () => {
    m = new Modal({
      header: $('<span>xxx</span>'),
      content: 'xxx',
      className: 'abc'
    })
    m.show()
    expect($('.pilipa-modal-content.abc').length).toBe(1)
  })
})
