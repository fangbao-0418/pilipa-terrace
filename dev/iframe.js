import React from 'react'
import Config from '../components/config'
import Iframe from '../components/iframe/index'
import Upload from './Upload'
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
            token='51794584-2da3-4f16-a7fe-da433e311bf9'
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
