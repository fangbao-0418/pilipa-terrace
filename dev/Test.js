import React from 'react'
import Svt from 'font-awesome/fonts/fontawesome-webfont.svg'
class Main extends React.Component {
  componentWillMount () {
  }
  render () {
    return (
      <div>
        <h3>测试 \f107</h3>
        <Svt width={2000} height={2000} />
      </div>
    )
  }
}
export default Main
