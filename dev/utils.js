import React from 'react'
import { throttle } from '../components'
class Main extends React.Component {
  constructor () {
    super()
    this.id = 1
  }
  fn1 () {
    console.log(this.id)
  }
  render () {
    return (
      <div>
        utils
        <button
          onClick={throttle(() => {
            this.fn1()
          }, 2000)}
        >测试函数接口</button>
      </div>
    )
  }
}
export default Main
