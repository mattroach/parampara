import React from 'react'
import AppNavBar from '../AppNavBar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const LoginButton = styled(Button)`
  background: rgba(255, 255, 255, 0.25);
`

const Wrapper = styled.div`
  text-align: center;
  padding-top: 3rem;
`

const SignedOut: React.FunctionComponent = () => (
  <>
    <AppNavBar onLogoClick={() => (window.location.href = 'http://getparampara.com')}>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="https://getparampara.com">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Nav.Item>
          <Button href="/login" variant="success" style={{ marginRight: 10 }}>
            Sign Up
          </Button>
        </Nav.Item>
        <Nav.Item>
          <LoginButton href="/login">Login</LoginButton>
        </Nav.Item>
      </Nav>
    </AppNavBar>
    <Wrapper>
      <h1>Page not available</h1>
      <p>
        You may need to <a href="/login">login</a> before you can view this page.
      </p>
    </Wrapper>
  </>
)

export default SignedOut
