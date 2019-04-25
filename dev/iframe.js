import React from 'react'
import Config from '../components/config'
import Iframe from '../components/iframe/index'
import
{
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'
const Router = HashRouter
Config.env = 'development'
class Main extends React.Component {
  render () {
    return (
      <div style={ { height: '100%' } }>
        <Router>
          <Iframe
            token='24d64163-1804-44db-9723-70ae419a5eef'
            env='development'
          >
          </Iframe>
        </Router>
      </div>
    )
  }
}
export default Main
