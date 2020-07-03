import React from 'react'
import Button, { ButtonProps } from 'react-bootstrap/Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 100%;
  font-size: 12px;

  width: 30px;
  height: 30px;
  padding: 0;
`
type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const GoButton: React.FunctionComponent<Props> = props => (
  <StyledButton {...props} variant="primary" type="submit">
    Go
  </StyledButton>
)

export default GoButton
