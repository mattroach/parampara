import React from 'react'
import styled from 'styled-components'
import AdminLayout from 'layout/AdminLayout'

const Wrapper = styled.section`
  text-align: center;
  padding-top: 3rem;
`

const RouteNotFoundPage: React.FunctionComponent = () => (
  <AdminLayout>
    <Wrapper>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
    </Wrapper>
  </AdminLayout>
)

export default RouteNotFoundPage
