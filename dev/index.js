import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Iframe from './iframe'
render(
  <Iframe />,
  document.getElementById('app')
)
