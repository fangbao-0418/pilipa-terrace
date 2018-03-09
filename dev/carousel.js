/**
 * Created by zhijiansi on 08/03/2018.
 */
import React from 'react'
import { Carousel } from '../index'

export default class extends React.Component {
  constructor () {
    super()
    this.data = [
      {
        url: 'http://react-responsive-carousel.js.org/assets/1.jpeg',
        name: 'image1'
      }, {
        url: 'http://react-responsive-carousel.js.org/assets/2.jpeg',
        name: 'image2'
      }, {
        url: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        name: 'image3'
      }
    ]
  }
  render () {
    return (
      <Carousel
        dataSource={this.data}
        style={{border: '3px solid'}}
      />
    )
  }
}
