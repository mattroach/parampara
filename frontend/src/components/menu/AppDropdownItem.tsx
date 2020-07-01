import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { DropdownItemProps } from 'react-bootstrap/DropdownItem'
import MaterialIcon from 'material-icons-react'
import styled from 'styled-components'

const StyledDropdownItem = styled(Dropdown.Item)`
  i {
    vertical-align: sub;
    margin-right: 1rem;
    color: inherit;
  }
`

type Props = {
  isLoading?: boolean
  icon?: string
} & DropdownItemProps

const AppDowndownItem: React.FunctionComponent<Props> = ({
  icon,
  isLoading,
  disabled,
  onClick,
  children,
  ...otherProps
}) => {
  return (
    <StyledDropdownItem
      {...otherProps}
      disabled={disabled || isLoading}
      onClick={isLoading ? undefined : onClick}
    >
      {icon && <MaterialIcon icon={icon} size={18} />}
      {isLoading ? 'Loading..' : children}
    </StyledDropdownItem>
  )
}

export default AppDowndownItem
