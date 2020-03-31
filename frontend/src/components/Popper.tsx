import React, { RefObject } from 'react'
import {
  createPopper,
  Modifier,
  Placement,
  PositioningStrategy,
  Instance
} from '@popperjs/core'
import Portal from './Portal'

type Props = {
  placement?: Placement
  strategy?: PositioningStrategy
  modifiers?: Partial<Modifier<any>>[]
  target: RefObject<Element>
  show: boolean
}

class Popper extends React.Component<Props> {
  popperRef = React.createRef<HTMLElement>()
  popper?: Instance

  componentDidMount() {
    this.popper = createPopper(this.props.target.current!, this.popperRef.current!, {
      placement: this.props.placement || 'right-start',
      strategy: this.props.strategy || 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4]
          }
        },
        ...(this.props.modifiers || [])
      ]
    })
  }

  componentDidUpdate() {
    this.popper!.forceUpdate()
  }

  componentWillUnmount() {
    this.popper!.destroy()
  }

  render() {
    return (
      <Portal>
        <div className="_popper_container" ref={this.popperRef as any}>
          {this.props.show && this.props.children}
        </div>
      </Portal>
    )
  }
}

export default Popper
