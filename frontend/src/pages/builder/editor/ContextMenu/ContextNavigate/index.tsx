import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import NavigationForm from './NavigationForm'


type Props = {
  position: number
  targetRef: React.RefObject<any>
  disabled?: boolean
  onChangeNavigation: (nextId: number) => void
}

const ItemMenuNavigation: React.FunctionComponent<Props> = ({ disabled, position, targetRef, onChangeNavigation }) => {
  const [isShow, setShow] = useState(false)
  const hide = () => setShow(false)
  const show = () => setShow(true)

  const changeNavigation = (nextId: number) => {
    onChangeNavigation(nextId)
    hide()
  }

  return (
    <>
      <Overlay
        show={isShow}
        target={targetRef.current}
        placement="right"
        rootClose={true}
        onHide={hide}
      >
        <Popover id="popover-nav">
          <Popover.Content>
            <NavigationForm position={position} onSelect={changeNavigation} />
          </Popover.Content>
        </Popover>
      </Overlay>
      <Dropdown.Item as="button" disabled={disabled} onClick={show}>Add navigation jump</Dropdown.Item>
    </>
  )
}

export default ItemMenuNavigation