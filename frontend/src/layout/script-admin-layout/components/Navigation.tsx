import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'

type State = {
  value: string
}

type Props = {
  className?: string
} & RouteComponentProps

class Navigation extends React.Component<Props, State> {

  selectItem = (selectedKey: string) => {
    // TODO do some navigation
    console.log(selectedKey)
  }

  render() {
    return (
      <Nav
        variant="tabs"
        activeKey="create"
        className={this.props.className}
        onSelect={this.selectItem}>
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
}


export default withRouter(Navigation)