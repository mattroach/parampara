import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store/rootReducer'
import DropdownItems from './DropdownItems'
import logo from './logo_white.png'
import styled from 'styled-components'
import RootContainer from 'layout/RootContainer'

const Wrapper = styled.section`
  background: var(--primary);
`
const StyledRootContainer = styled(RootContainer)`
  padding: 0;
`

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
    <Wrapper>
      <StyledRootContainer>
        <Navbar collapseOnSelect bg="primary" variant="dark" expand="sm">
          <Navbar.Brand href="#" onClick={goBackToDirectory}>
            <img alt="Parampara" src={logo} width={200} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">{extra}</Nav>
            <Nav activeKey={false}>
              <NavDropdown title={email} id="account-dd">
                <DropdownItems />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </StyledRootContainer>
    </Wrapper>
  )
}

export default AppNavBar
