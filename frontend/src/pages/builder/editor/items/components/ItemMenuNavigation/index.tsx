import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import NavigationForm from './NavigationForm'


type Props = {
  position: number
  targetRef: React.RefObject<any>
}

const ItemMenuNavigation: React.FunctionComponent<Props> = ({ position, targetRef }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Overlay
        show={show}
        target={targetRef.current}
        placement="right"
      >
        <Popover id="popover-nav">
          <Popover.Content>
            <NavigationForm position={position} />
          </Popover.Content>
        </Popover>
      </Overlay>
      <Dropdown.Item as="button" onClick={() => setShow(true)}>Add navigation jump</Dropdown.Item>
    </>
  )
}

export default ItemMenuNavigation