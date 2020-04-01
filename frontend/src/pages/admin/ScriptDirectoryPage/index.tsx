import React from 'react'
import styled from 'styled-components'

import AdminLayout from 'layout/AdminLayout'
import Scripts from './components/Scripts'

const Wrapper = styled.section`
  margin: 60px auto 0 auto;
  max-width: 1000px;
  padding: 0 20px;
`
type Props = {
  adminId: string
}

const ScriptDirectory: React.FunctionComponent<Props> = ({ adminId }) => (
  <AdminLayout adminId={adminId}>
    <Wrapper>
      <h2>My Parampara</h2>
      <Scripts adminId={adminId} />
    </Wrapper>
  </AdminLayout>
)

export default ScriptDirectory
