import React from 'react'
import loading from '../components/loading'
export default class extends React.Component {
  toClick (type) {
    loading.show()
    setTimeout(() => {
      loading.hide()
    }, 1000)
  }
  toClick2 (type) {
    loading.hide()
  }
  render () {
    return (
      <div>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick.bind(this, 'show')}
        >
          show
        </button>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick2.bind(this, 'hide')}
        >
          hide
        </button>
      </div>
    )
  }
}
