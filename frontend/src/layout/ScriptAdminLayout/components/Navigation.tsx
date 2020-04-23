import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { LinkContainer } from 'react-router-bootstrap'

type Props = {
  className?: string
}

const Navigation: React.FunctionComponent<Props> = ({ className }) => {
  const { adminId, scriptId } = useSelector((state: RootState) => ({
    adminId: state.adminStore.admin!.id,
    scriptId: state.scriptStore.script!.id
  }))

  const to = (path: string) => `/builder/${adminId}/${scriptId}/${path}`

  return (
    <Nav variant="tabs" className={className}>
      <Nav.Item>
        <LinkContainer to={to('create')}>
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
