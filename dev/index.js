import 'babel-polyfill'
import 'pilipa/dist/pilipa.css'
import React from 'react'
import { render } from 'react-dom'
import Iframe from './iframe'
render(
  <Iframe />,
  document.getElementById('app')
)
