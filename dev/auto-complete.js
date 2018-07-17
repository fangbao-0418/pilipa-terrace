import React from 'react'

// import { AutoComplete } from '../index'
import { AutoComplete } from '../index'
export default class extends React.Component {
  constructor () {
    super()
    this.data = [{
      code: '1001',
      key: '1001',
      title: '测试1001'
    }]
    for (var i = 0; i <= 100; i++) {
      this.data.push({
        code: `k${i}`,
        key2: i,
        title2: `测试数xxxxxxxxxxxxxxxx据${i}`
      })
    }
    this.state = {
      value: {
        title: 2
      }
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        value: {
          title: 44444
        }
      })
    }, 1000)
  }
  render () {
    return (
      <div>
        <AutoComplete
          data={this.data}
          style={{float: 'left'}}
          setFields={{
            title: 'title2',
            key: 'key2'
          }}
          onChange={(item) => {
            console.log(item)
          }}
          initCapital={(item) => {
            return [item.code]
          }}
        />
        <AutoComplete
          style={{float: 'left'}}
          data={this.data.slice(0, 4)}
          setFields={{
            title: 'title2',
            key: 'key2'
          }}
          defaultValue='0'
          onChange={(item) => {
            console.log(item)
          }}
        />
        <AutoComplete
          style={{float: 'left'}}
          data={this.data.slice(0, 4)}
          setFields={{
            title: 'title2',
            key: 'key2'
          }}
          defaultValue={this.state.value}
          onChange={(item) => {
            console.log(item)
          }}
        />
      </div>
    )
  }
}
