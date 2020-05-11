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
import Badge from 'react-bootstrap/Badge'
import { getSubscription } from 'store/slices/admin'

const Wrapper = styled.section`
  background: var(--primary);
`
const StyledRootContainer = styled(RootContainer)`
  padding: 0;
`

const ProBadge = styled(Badge).attrs({ variant: 'light', pill: true })`
  opacity: 0.75;
`

type Props = {
  extra: React.ReactNode
  adminId: string
}

const AppNavBar: React.FunctionComponent<Props> = ({ extra, adminId }) => {
  const email = useSelector((state: RootState) => state.adminStore.admin?.email)
  const subscription = useSelector((state: RootState) =>
    getSubscription(state.adminStore)
  )
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
            {subscription.hasProBadge() && (
              <Nav>
                <ProBadge>Pro</ProBadge>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </StyledRootContainer>
    </Wrapper>
  )
}

export default AppNavBar
