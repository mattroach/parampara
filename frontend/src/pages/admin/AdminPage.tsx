import React from 'react';
import styled from 'styled-components';

import AdminLayout from '../../components/AdminLayout';
import CreateScriptButton from './components/CreateScriptButton';
import Scripts from './components/Scripts';

const AddNewButton = styled.div`
  text-align: right;
  margin: 10px 0;
`

type Props = {
  adminId: string
}

export default class AdminPage extends React.Component<Props, {}> {

  render() {
    return (
      <AdminLayout adminId={this.props.adminId}>
        <h2>Your Paramparas</h2>
        <AddNewButton>
          <CreateScriptButton adminId={this.props.adminId} />
        </AddNewButton>
        <Scripts adminId={this.props.adminId} />
      </AdminLayout>
    )
  }
}
