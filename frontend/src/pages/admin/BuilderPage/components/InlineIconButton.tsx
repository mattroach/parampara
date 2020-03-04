import MaterialIcon from 'material-icons-react'
import React, { forwardRef, useState, RefObject } from 'react'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import styled from 'styled-components'
import Overlay from 'react-bootstrap/Overlay'

const IconButton = styled(Button)`
  vertical-align: top;
  padding: 0;
  height: 36px;
  width: 40px;
  border: none;

  transition: box-shadow 0.15s ease-in-out;
  :focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  i {
    vertical-align: middle;
  }
`
type Props = {
  icon: string
  iconSize?: number
  color?: string
  tooltip: string
  disableTooltip?: boolean
  onClick?: () => void
  type?: string
  className?: string
}

const InlineIconButton: React.RefForwardingComponent<HTMLInputElement, Props> = (
  { icon, iconSize, color, tooltip, onClick, disableTooltip, type, className },
  ref
) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <IconButton
        className={className}
        ref={ref}
        type={type}
        variant="link"
        onClick={(e: any) => {
          //e.preventDefault()
          onClick && onClick()
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <MaterialIcon icon={icon} size={iconSize ? iconSize : 30} color={color} />
      </IconButton>

      <Overlay
        target={(ref as RefObject<HTMLInputElement>).current!}
        show={show && !disableTooltip}
        placement="top"
      >
        {(props: any) => (
          <Tooltip {...props} show={props.show.toString()}>
            {tooltip}
          </Tooltip>
        )}
      </Overlay>
    </>
  )
}

export default forwardRef(InlineIconButton)
