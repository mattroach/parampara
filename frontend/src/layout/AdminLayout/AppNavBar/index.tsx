import RootContainer from 'layout/RootContainer'
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'
import logo from './logo_white.png'

const Wrapper = styled.section`
  background: var(--primary);
`
const StyledRootContainer = styled(RootContainer)`
  padding: 0;
`

type Props = {
  onLogoClick: () => void
}

const AppNavBar: React.FunctionComponent<Props> = ({ onLogoClick, children }) => {
  const logoClick = (event: any) => {
    event.preventDefault()
    onLogoClick()
  }

  return (
    <Wrapper>
      <StyledRootContainer>
        <Navbar collapseOnSelect bg="primary" variant="dark" expand="sm">
          <Navbar.Brand href="#" onClick={logoClick}>
            <img alt="Parampara" src={logo} width={200} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">{children}</Navbar.Collapse>
        </Navbar>
      </StyledRootContainer>
    </Wrapper>
  )
}

export default AppNavBar
