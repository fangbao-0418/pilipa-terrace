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
            token='c5291b73-00ed-444a-b58c-ae34c5ee9363.1564491180072'
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
