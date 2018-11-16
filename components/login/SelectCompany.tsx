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
          this.history()
        })
      } else {
        this.setState({
          dataSource: res
        })
      }
    })
  }
  public history (url = '/') {
    if (Config.env === 'production') {
      window.location.href = '/'
    } else {
      Config.history('/')
    }
  }
  public render () {
    const { dataSource } = this.state
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
                        this.history()
                      })
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
