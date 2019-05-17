import React from 'react'
import Config from '../components/config'
import Iframe from '../components/iframe/index'
import http from '../components/http'
import Upload from './Upload'
import
{
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'
const Router = HashRouter
Config.env = 'development'
class Main extends React.Component {
  componentWillMount () {
    http('/crm-manage/v1/api/customer-opportunity', 'GET', {
      tab: 3,
      pageSize: 15,
      pageCurrent: 1
    })

    http('/user/v1/api/company/login/region', 'POST', ['DirectCompany']).then((res) => {
      console.log(res, 'result')
    }, (err) => {
      console.log(err, 'error')
    })
  }
  componentDidCatch (E, info) {
    console.log(E, info, 'error info')
  }
  render () {
    const a = {}
    return (
      <div style={ { height: '100%' } }>
        <Router>
          <Iframe
            content={false}
            token='24d64163-1804-44db-9723-70ae419a5eef'
            env='development'
          >
            <Route path='/upload' component={Upload} />
          </Iframe>
        </Router>
      </div>
    )
  }
}
export default Main
