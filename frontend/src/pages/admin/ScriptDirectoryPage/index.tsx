import React from 'react'
import styled from 'styled-components'

import AdminLayout from 'layout/AdminLayout'
import Scripts from './components/Scripts'
import RootContainer from 'layout/RootContainer'

const Wrapper = styled.section`
  margin-top: 40px;
`
type Props = {
  adminId: string
}

const ScriptDirectory: React.FunctionComponent<Props> = ({ adminId }) => (
  <AdminLayout adminId={adminId}>
    <RootContainer>
      <Wrapper>
        <h2>My Parampara</h2>
        <Scripts adminId={adminId} />
      </Wrapper>
    </RootContainer>
  </AdminLayout>
)

export default ScriptDirectory
