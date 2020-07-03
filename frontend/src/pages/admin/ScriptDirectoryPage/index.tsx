import React from 'react'
import styled from 'styled-components'

import AdminLayout from 'layout/AdminLayout'
import Scripts from './components/Scripts'
import RootContainer from 'layout/RootContainer'

const Wrapper = styled.section`
  margin: 40px 0 100px 0;
`

const ScriptDirectory: React.FunctionComponent = () => (
  <AdminLayout>
    <RootContainer>
      <Wrapper>
        <h2>My Parampara</h2>
        <Scripts />
      </Wrapper>
    </RootContainer>
  </AdminLayout>
)

export default ScriptDirectory
