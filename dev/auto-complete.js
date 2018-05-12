import React from 'react'

// import { AutoComplete } from '../index'
import { AutoComplete } from '../index'
export default class extends React.Component {
  constructor () {
    super()
    this.data = []
    for (var i = 0; i <= 100; i++) {
      this.data.push({
        key: i,
        title: `测试数据${i}`
      })
    }
  }
  render () {
    return (
      <div>
        <AutoComplete
          data={this.data}
          onChange={(item) => {
            console.log(item)
          }}
        />
      </div>
    )
  }
}
