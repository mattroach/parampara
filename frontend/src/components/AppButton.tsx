import React from 'react'
import Button, { ButtonProps } from 'react-bootstrap/Button'

type Props = { isLoading: boolean } & ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const AppButton: React.FunctionComponent<Props> = ({
  isLoading,
  disabled,
  onClick,
  children,
  ...otherProps
}) => {
  return (
    <Button
      {...otherProps}
      disabled={disabled || isLoading}
      onClick={isLoading ? undefined : onClick}
    >
      {isLoading ? 'Loading..' : children}
    </Button>
  )
}

export default AppButton
