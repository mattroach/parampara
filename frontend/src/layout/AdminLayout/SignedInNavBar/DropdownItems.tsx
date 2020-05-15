import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'

const DropdownItems: React.FunctionComponent = () => (
  <>
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
  </>
)

export default DropdownItems
