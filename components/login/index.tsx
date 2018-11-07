import React from 'react'
import Form from './Form'
import SearchCompany from './SelectCompany'
import Config from '../config'
interface State {
  step: 1 | 2
}
class Main extends React.Component {
  public state: State = {
    step: Config.token ? 2 : 1
  }
  public render () {
    const { step } = this.state
    return (
      <div className='pilipa-terrace-login-container'>
        {step === 1 && (
          <Form
            onOk={() => {
              this.setState({
                step: 2
              })
            }}
          />
        )}
        {step === 2 && <SearchCompany />}
        <div className='footer'>
          <span>Copyright © 2018 噼里啪智能·财税 版权所有</span>
        </div>
      </div>
    )
  }
}
export default Main
