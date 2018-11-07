import React from 'react'
import { companylist, bindCompany } from '../api'
import Config from '../config'
interface States {
  dataSource: Array<{companyName: string, companyId: string}>
}
class Main extends React.Component {
  public state: States = {
    dataSource: []
  }
  public componentWillMount () {
    const token = Config.token
    companylist(token).then((res) => {
      if (res.length === 1) {
        const item = res[0]
        bindCompany({
          companyId: item.companyId,
          token: Config.token
        }).then(() => {
          location.replace('/')
        })
      } else {
        this.setState({
          dataSource: res
        })
      }
    })
  }
  public render () {
    const { dataSource } = this.state
    // if (dataSource.length <= 1) {
    //   return null
    // }
    return (
      <div className='select-company'>
        <ul>
          {
            dataSource.map((item, index) => {
              return (
                <li key={`search-company-${index}`}>
                  <span
                    onClick={() => {
                      bindCompany({
                        companyId: item.companyId,
                        token: Config.token
                      }).then((res) => {
                        console.log(res)
                        // APP.history.push('/')
                      })
                      // APP.history.push('/')
                    }}
                  >
                    {item.companyName}
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
export default Main
