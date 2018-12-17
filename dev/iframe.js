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
            // token='973be12280904f7285c155bee443c7f244'
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
