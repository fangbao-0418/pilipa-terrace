/**
 * Created by zhijiansi on 07/03/2018.
 */
import ClassNames from 'classnames'
import $ from 'jquery'
import React from 'react'

export interface CarouselProps {
  dataSource: any[]
  className?: string
  style?: React.CSSProperties
}
export interface CarouselStates {
  selectedItem: number
}
export default class extends React.Component<CarouselProps, CarouselStates> {
  public defaultCls = 'pilipa-carousel'
  public constructor (props: CarouselProps) {
    super(props)
    this.state = {
      selectedItem: 1
    }
  }
  public handlePrev = () => {
    const {selectedItem} = this.state
    const {slider} = this.refs
    if (selectedItem === 1) {
      return
    } else {
      this.setState({selectedItem: selectedItem-1}, () => {
        const width = $(slider).children().width()
        $(slider).css('transform',`translateX(-${this.state.selectedItem-1}00%)`)
        console.log('prev')
      })
    }
  }
  public handleNext = () => {
    const {dataSource} = this.props
    const {selectedItem} = this.state
    const {slider} = this.refs
    if (selectedItem === dataSource.length) {
      return
    } else {
      this.setState({selectedItem: selectedItem+1}, () => {
        const width = $(slider).children().width()
        $(slider).css('transform',`translateX(-${this.state.selectedItem-1}00%)`)
        console.log('next')
      })
    }
  }
  public toMove = (index: number) => {
    const {selectedItem} = this.state
    const {slider} = this.refs
    if (selectedItem !== index+1) {
      this.setState({selectedItem: index+1},()=> {
        const width = $(slider).children().width()
        $(slider).css('transform',`translateX(-${this.state.selectedItem-1}00%)`)
      })
    }
  }
  public render () {
    const {dataSource, className, style} = this.props
    const {selectedItem} = this.state
    console.log(dataSource)
    return (
      <div className={ClassNames(this.defaultCls, className)} style={style}>
        <div className='carousel carousel-slider'>
          <div className='slider-wrapper axis-horizontal'>
            <ul className='slider animated' ref='slider'>
              {dataSource.length > 0 && dataSource.map((item: any, index: number) => {
                return (<li className={selectedItem === index+1 ? 'selected slide' : 'slide'} key={index}>
                  <img src={item.url}/>
                </li>)
              })}
            </ul>
          </div>
          <div className='thumbs-wrapper axis-vertical'>
            <ul className='thumbs animated' style={{transform: 'translate3d(0px, 0px, 0px)'}}>
              {dataSource.length > 0 && dataSource.map((item: any, index: number) => {
                return (<li
                  className={selectedItem === index+1 ? 'selected thumb' : 'thumb'}
                  key={index}
                  onClick={this.toMove.bind(this, index)}
                >
                  <img src={item.url}/>
                </li>)
              })}
            </ul>
          </div>
          {
            selectedItem !== 1 &&
              <button
                onClick={this.handlePrev.bind(this)}
                className='control-arrow control-prev'
              >
                上一张
              </button>
          }
          {
            selectedItem !== dataSource.length &&
            <button onClick={this.handleNext.bind(this)} className='control-arrow control-next' >下一张</button>
          }
        </div>
      </div>
    )
  }
}
