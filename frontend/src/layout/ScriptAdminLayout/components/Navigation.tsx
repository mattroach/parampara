import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

type Props = {
  className?: string
}

const Navigation: React.FunctionComponent<Props> = ({ className }) => {
  const scriptId = useSelector(state => state.scriptStore.script!.id)

  const to = (path = '') => `/script/${scriptId}/${path}`

  return (
    <Nav variant="tabs" className={className}>
      <Nav.Item>
        <LinkContainer exact to={to()}>
          <Nav.Link>Create</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to={to('share')}>
          <Nav.Link>Share</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to={to('results')}>
          <Nav.Link>Results</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  )
}

export default Navigation
