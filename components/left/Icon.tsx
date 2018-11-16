import classNames from 'classnames'
import React from 'react'
interface Props {
  src: string
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <span
        className={'menu-icon'}
        style={{
          backgroundImage: `url(${this.props.src})`
        }}
      >
      </span>
    )
  }
}
export default Main
