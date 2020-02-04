import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import AdminLayout from '../../components/AdminLayout';

type Props = {
  adminId: string
  scriptId: string
} & RouteComponentProps

class BuilderPage extends React.Component<Props, {}> {

  goBackToDirectory = (event: any) => {
    event.preventDefault();
    this.props.history.push(`/u/${this.props.adminId}`)
  }

  render() {
    return (
      <AdminLayout
        adminId={this.props.adminId}
        navbarExtra={
          <Nav className="mr-auto">
            <Nav.Link href="#" onClick={this.goBackToDirectory}>Back to directory</Nav.Link>
          </Nav>
        }>
        yo
      </AdminLayout>
    )
  }
}

export default withRouter(BuilderPage)