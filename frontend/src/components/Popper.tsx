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
  container?: React.RefObject<HTMLDivElement>
  target: RefObject<Element>
  show: boolean
  hideArrow?: boolean
  onBlur?: () => void
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

  componentDidUpdate(prevProps: Props) {
    this.popper!.forceUpdate()

    const { show } = this.props
    if (this.props.onBlur && prevProps.show !== show) {
      if (show) {
        document.addEventListener('click', this.handleClickOutside)
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    }
  }

  componentWillUnmount() {
    this.popper!.destroy()
    if (this.props.onBlur) {
      document.removeEventListener('click', this.handleClickOutside)
    }
  }

  handleClickOutside = (event: MouseEvent) => {
    if (!this.props.show) return

    if (this.popperRef.current && !this.popperRef.current.contains(event.target as any)) {
      console.log('popper blur')
      this.props.onBlur!()
    }
  }

  render() {
    const { container, show, hideArrow, children } = this.props
    return (
      <Portal container={container}>
        <div ref={this.popperRef as any} className="popper_container">
          {show && children}
          <div
            data-popper-arrow
            className="popper_arrow"
            style={{ display: show && !hideArrow ? 'inherit' : 'none' }}
          />
        </div>
      </Portal>
    )
  }
}

export default Popper
