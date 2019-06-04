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
            token='c8c6d25b-3f2c-4883-9da3-964884b1a9b3.1559615758697'
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
