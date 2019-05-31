import React from 'react'
import Config from '../components/config'
import Iframe from '../components/iframe/index'
import Upload from './Upload'
import Test from './Test'
import
{
  HashRouter,
  Route
} from 'react-router-dom'
const Router = HashRouter
Config.env = 'development'
class Main extends React.Component {
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
            token='dc947f9b-d7b7-4966-8292-050ea1f03f4f.1559288504682'
            env='development'
          >
            <Route path='/upload' component={Upload} />
            <Route path='/test' component={Test} />
          </Iframe>
        </Router>
      </div>
    )
  }
}
export default Main
