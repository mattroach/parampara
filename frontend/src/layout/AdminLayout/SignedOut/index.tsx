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
  max-width: 600px;
  margin: 0 auto;
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
          <LoginButton href="/login">Log in</LoginButton>
        </Nav.Item>
      </Nav>
    </AppNavBar>
    <Wrapper>
      <h1>Oops! You're logged out.</h1>
      <p>
        You may need to <a href="/login">log in</a> before you can view this page.
      </p>
      <p>
        If you're looking for your Parampara creator page, you must first{' '}
        <a href="/login">create an account</a> if you don't already have one.
      </p>
    </Wrapper>
  </>
)

export default SignedOut
