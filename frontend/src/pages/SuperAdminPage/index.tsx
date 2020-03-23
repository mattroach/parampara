import React from 'react'
import styled from 'styled-components'
import CreateUser from './CreateUser'
import ListUsers from './ListUsers'
import UpdatePassword from './UpdatePassword'

type Props = {
  password: string
}

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 600px;
`

const SuperAdminPage: React.FunctionComponent<Props> = ({ password }) => {
  return (
    <Wrapper>
      <CreateUser password={password} />
      <br />
      <UpdatePassword password={password} />
      <br />
      <ListUsers password={password} />
    </Wrapper>
  )
}

export default SuperAdminPage
