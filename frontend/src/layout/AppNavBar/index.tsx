import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useSelector } from 'react-redux'

import { RootState } from 'store/rootReducer'
import logo from './logo_white.png'
import { useHistory } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

type Props = {
  extra: React.ReactNode
  adminId: string
}

const AppNavBar: React.FunctionComponent<Props> = ({ extra, adminId }) => {
  const email = useSelector((state: RootState) => state.adminStore.admin?.email)
  const history = useHistory()

  const goBackToDirectory = (event: any) => {
    event.preventDefault()
    history.push(`/u/${adminId}`)
  }

  return (
    <Navbar collapseOnSelect bg="primary" variant="dark" expand="sm">
      <Navbar.Brand href="#" onClick={goBackToDirectory}>
        <img alt="Parampara" src={logo} width={200} />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">{extra}</Nav>
        <Nav activeKey={false}>
          <NavDropdown title={email} id="account-dd">
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
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavBar
