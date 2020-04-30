import React from 'react'
import CreateUser from './CreateUser'
import ListUsers from './ListUsers'
import UpdatePassword from './UpdatePassword'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const SuperAdminPage: React.FunctionComponent = () => {
  return (
    <Container>
      <Row>
        <StyledCol lg>
          <CreateUser />
        </StyledCol>
        <StyledCol lg>
          <UpdatePassword />
        </StyledCol>
      </Row>
      <Row>
        <StyledCol>
          <ListUsers />
        </StyledCol>
      </Row>
    </Container>
  )
}

const StyledCol = styled(Col)`
  margin-top: 20px;
  margin-bottom: 20px;
`

export default SuperAdminPage
