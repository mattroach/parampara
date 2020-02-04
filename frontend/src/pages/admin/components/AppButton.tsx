import React from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';

type Props = { isLoading: boolean } & ButtonProps
  & { onClick?: (event: any) => void } // TODO proper typing

const AppButton: React.FunctionComponent<Props> = (props) => {
  const { isLoading, ...otherProps } = props

  return (
    <Button
      {...otherProps}
      disabled={isLoading}
      onClick={isLoading ? undefined : props.onClick}
    >
      {isLoading ? 'Loading..' : props.children}
    </Button>
  )
}

export default AppButton