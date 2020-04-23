import MaterialIcon from 'material-icons-react'
import React from 'react'
import Button, { ButtonProps } from 'react-bootstrap/Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  padding: 0;
  vertical-align: sub;
  border: none;
  color: #000;

  transition: box-shadow 0.15s ease-in-out;
  :focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  i {
    vertical-align: middle;
    color: inherit !important;
    opacity: 0.6;
    transition: opacity 0.15s ease-in-out;
  }

  :hover i {
    color: #000 !important;
    opacity: 0.9;
  }
`

type Props = {
  icon: string
  iconSize?: number
} & ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const IconButton: React.FunctionComponent<Props> = ({
  icon,
  iconSize = 30,
  color,
  ...otherProps
}) => {
  return (
    <StyledButton {...otherProps} variant="link">
      <MaterialIcon icon={icon} size={iconSize} />
    </StyledButton>
  )
}

export default IconButton
