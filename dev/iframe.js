import 'antd/dist/antd.css'
import React from 'react'
import Config from '../components/config'
import Iframe from '../components/iframe/index'
import {
  HashRouter,
  Route
} from 'react-router-dom'
const Router = HashRouter
Config.env = 'production'
class Main extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <Iframe
            token='f4e0a26057d94a0fb6077a61ccd71051'
            // env='production'
          >
            <Route path='/organ' render={() => <div>organ</div> }/>
          </Iframe>
        </Router>
      </div>
    )
  }
}
export default Main
