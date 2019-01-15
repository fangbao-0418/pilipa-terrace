import React from 'react'
import SearchCompany from '../login/SelectCompany'
class Main extends React.Component {
  public render () {
    return (
      <div className='pilipa-terrace-login-container'>
        <SearchCompany />
        <div className='footer'>
          <span>Copyright © 2018 噼里啪智能·财税 版权所有</span>
        </div>
      </div>
    )
  }
}
export default Main
