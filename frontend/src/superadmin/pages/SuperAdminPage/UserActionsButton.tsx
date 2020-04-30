import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

type Props = { userId: string }

const UserActionsButton: React.FunctionComponent<Props> = () => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Actions"
      size="sm"
      variant="secondary"
    >
      <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Set password</Dropdown.Item>
    </DropdownButton>
  )
}

export default UserActionsButton
