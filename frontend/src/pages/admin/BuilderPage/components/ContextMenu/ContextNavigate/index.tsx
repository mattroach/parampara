import React, { useState, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import NavigationForm from './NavigationForm'

type Props = {
  position: number
  currentValue: number | undefined
  targetRef: React.RefObject<any>
  disabled?: boolean
  onChangeNavigation: (nextId: number) => void
}

const ItemMenuNavigation: React.FunctionComponent<Props> = ({
  disabled,
  currentValue,
  position,
  targetRef,
  onChangeNavigation
}) => {
  const focusRef = useRef<any>(null)
  const [isShow, setShow] = useState(false)
  const hide = () => setShow(false)
  const show = () => setShow(true)

  const changeNavigation = (nextId: number) => {
    onChangeNavigation(nextId)
    hide()
  }

  const focusGiphyPicker = () => {
    // We must focus this way instead of via autoFocus, as autoFocus causes the scroll to jump to the very top
    // (probably because the element is not rendered in the absolute position yet)
    focusRef.current!.focus()
  }

  return (
    <>
      <Overlay
        show={isShow}
        target={targetRef.current}
        onEntered={focusGiphyPicker}
        placement="right"
        rootClose={true}
        onHide={hide}
      >
        <Popover id="popover-nav">
          <Popover.Content>
            <NavigationForm
              focusRef={focusRef}
              position={position}
              onSelect={changeNavigation}
              currentValue={currentValue}
            />
          </Popover.Content>
        </Popover>
      </Overlay>
      <Dropdown.Item as="button" disabled={disabled} onClick={show}>
        Add navigation jump
      </Dropdown.Item>
    </>
  )
}

export default ItemMenuNavigation
