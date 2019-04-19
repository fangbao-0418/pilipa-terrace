import React from 'react'
import Config from '../components/config'
import Iframe from '../components/iframe/index'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
const Router = BrowserRouter
Config.env = 'production'
class Main extends React.Component {
  render () {
    return (
      <div style={{height: '100%'}}>
        <Router>
          <Switch>
            <Iframe
              token='103a43c0-b801-4b3e-adf9-5814d430ab78'
              // env='production'
            >
              <Route path='/organ' render={() => <div>organ</div> }/>
            </Iframe>
          </Switch>
        </Router>
      </div>
    )
  }
}
export default Main
