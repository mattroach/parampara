import React from 'react'
import styled from 'styled-components'

import AppNavBar from './AppNavBar'

export const Wrapper = styled.section`
  margin: 20px;
  max-width: 1000px;
`

const AdminLayout: React.FunctionComponent<{}> = ({ children }) => {

  return (
    <>
      <AppNavBar />
      <Wrapper>
        {children}
      </Wrapper>
    </>
  )
}

export default AdminLayout