/* global describe, it, expect, beforeAll, beforeEach, afterAll, afterEach, xit */
import { cookie } from '../libs'

describe(('test cookie'), () => {
  beforeAll(() => {
    console.log('before all')
  })
  beforeEach(() => {
    cookie.removeAll()
  })
  afterAll(() => {
    console.log('after all')
    cookie.removeAll()
  })
  it('test set cookie', () => {
    cookie.set({abc: '123'}, {
      expires: new Date((new Date().getTime() + 3600 * 24 * 1000))
    })
    expect(cookie.get).toBeTruthy()
    expect(cookie.get('abc')).toBe('123')
  })
  it('test cookie expires', (done) => {
    cookie.set({test: '123'}, { expires: 2000 })
    setTimeout(() => {
      expect(cookie.get('test')).toBe('123')
    }, 1000)
    setTimeout(() => {
      expect(cookie.get('test')).toBe(undefined)
      done()
    }, 2000)
  })
  it('test remove cookie', () => {
    cookie.set({
      abc: 'abc'
    }, {
      expires: 4000
    })
    expect(cookie.get('abc')).toBe('abc')
    cookie.remove('abc')
    expect(cookie.get('abc')).toBeFalsy()
  })
  it('test remove all cookies', () => {
    expect(cookie.get('a')).toBeFalsy()
    expect(cookie.get('b')).toBeFalsy()
    cookie.set({
      a: 1,
      b: 2
    }, {
      expires: 40000
    })
    expect(cookie.get('a')).toBe('1')
    expect(cookie.get('b')).toBe('2')
    cookie.removeAll()
    expect(cookie.get('a')).toBeFalsy()
    expect(cookie.get('b')).toBeFalsy()
  })
  it('test remove cookies', () => {
    expect(cookie.get('a')).toBeFalsy()
    expect(cookie.get('b')).toBeFalsy()
    cookie.set({
      a: 1,
      b: 2
    }, {
      expires: 40000
    })
    cookie.remove('a')
    expect(cookie.get('a')).toBeFalsy()
    expect(cookie.get('b')).toBe('2')
    cookie.remove(['b'])
    expect(cookie.get('b')).toBeFalsy()
    cookie.set({
      a: 1,
      b: 2
    }, {
      expires: 40000
    })
    expect(cookie.get('a')).toBe('1')
    expect(cookie.get('b')).toBe('2')
    cookie.remove(['a', 'b'])
    expect(cookie.get('a')).toBeFalsy()
    expect(cookie.get('b')).toBeFalsy()
  })
})
