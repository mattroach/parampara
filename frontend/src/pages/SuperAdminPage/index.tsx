import React from 'react'
import styled from 'styled-components'
import CreateUser from './CreateUser'
import ListUsers from './ListUsers'

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
      <ListUsers password={password} />
    </Wrapper>
  )
}

export default SuperAdminPage