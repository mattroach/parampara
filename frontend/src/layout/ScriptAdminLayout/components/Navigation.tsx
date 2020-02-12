import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { useLocation, useHistory } from 'react-router-dom'

type Props = {
  className?: string
}

const Navigation: React.FunctionComponent<Props> = ({ className }) => {
  const history = useHistory()
  const location = useLocation()
  const { adminId, scriptId } = useSelector((state: RootState) => ({
    adminId: state.adminStore.admin!.id,
    scriptId: state.scriptStore.script!.id
  }))

  const pathParts = location.pathname.split('/')
  const activeKey = pathParts[pathParts.length - 1]

  const selectItem = (selectedKey: string) => {
    history.push(`/builder/${adminId}/${scriptId}/${selectedKey}`)
  }

  return (
    <Nav
      variant="tabs"
      activeKey={activeKey}
      className={className}
      onSelect={selectItem}>
      <Nav.Item>
        <Nav.Link eventKey="create">Create</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="share">Share</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="results">Results</Nav.Link>
      </Nav.Item>
    </Nav>
  )

}


export default Navigation