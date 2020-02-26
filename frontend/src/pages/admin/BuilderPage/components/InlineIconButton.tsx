import MaterialIcon from 'material-icons-react'
import React, { forwardRef, useState, RefObject } from 'react'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import styled from 'styled-components'
import Overlay from 'react-bootstrap/Overlay'

const IconButton = styled(Button)`
  vertical-align: top;
  padding: 0;
  height: 40px;
`
type Props = {
  icon: string
  tooltip: string
  disableTooltip?: boolean
  onClick?: () => void
}

const InlineIconButton: React.RefForwardingComponent<HTMLInputElement, Props> = ({ icon, tooltip, onClick, disableTooltip }, ref) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <IconButton
        ref={ref}
        variant="link"
        onClick={onClick}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      ><MaterialIcon icon={icon} size={40} /></IconButton>

      <Overlay
        target={(ref as RefObject<HTMLInputElement>).current!}
        show={show && !disableTooltip}
        placement="top"
      >
        {(props: any) => (
          <Tooltip {...props} show={props.show.toString()}>{tooltip}</Tooltip>
        )}
      </Overlay>
    </>
  )
}

export default forwardRef(InlineIconButton)