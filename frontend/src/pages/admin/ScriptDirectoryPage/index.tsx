import React from 'react'
import styled from 'styled-components'

import AdminLayout from 'layout/AdminLayout'
import CreateScriptButton from './components/CreateScriptButton'
import Scripts from './components/Scripts'


const Wrapper = styled.section`
  margin: 60px auto 0 auto;
  max-width: 1000px;
`

const AddNewButton = styled.div`
  text-align: right;
  margin: 10px 0;
`

type Props = {
  adminId: string
}

export default class ScriptDirectory extends React.Component<Props, {}> {

  render() {
    return (
      <AdminLayout adminId={this.props.adminId}>
        <Wrapper>
          <h2>Your Paramparas</h2>
          <AddNewButton>
            <CreateScriptButton adminId={this.props.adminId} />
          </AddNewButton>
          <Scripts adminId={this.props.adminId} />
        </Wrapper>
      </AdminLayout>
    )
  }
}
