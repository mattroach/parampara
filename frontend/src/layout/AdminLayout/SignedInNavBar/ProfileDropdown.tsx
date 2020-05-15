import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useSelector } from 'react-redux'
import ProfilePhoto from './ProfilePhoto'
import styled from 'styled-components'

const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-toggle {
    padding: 0 !important;
    ::after {
      display: none;
    }
  }
`

const DropdownHeader = styled.div`
  font-size: 0.8em;
  text-align: center;
  color: var(--gray);
  padding: 0 24px 8px 24px;
  border-bottom: 1px solid #dee2e6;
`

const ProfileButton = () => {
  const pictureUrl = useSelector(state => state.adminStore.admin!.pictureUrl)
  const displayName = useSelector(state => state.adminStore.admin!.displayName)
  return (
    <>
      {displayName}
      <ProfilePhoto src={pictureUrl} />
    </>
  )
}

const ProfileDropdown: React.FunctionComponent = () => {
  const email = useSelector(state => state.adminStore.admin!.email)
  return (
    <StyledNavDropdown alignRight title={<ProfileButton />} id="account-dd">
      <DropdownHeader>{email}</DropdownHeader>
      <NavDropdown.Item
        href="http://getparampara.com/upgrade.html?r=inapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        Upgrade
      </NavDropdown.Item>
      <NavDropdown.Item
        href="https://getparampara.com/help.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Help
      </NavDropdown.Item>
      <NavDropdown.Item
        href="https://getparampara.com/terms.html?r=appmenu"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms and Privacy
      </NavDropdown.Item>
      <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
    </StyledNavDropdown>
  )
}

export default ProfileDropdown
