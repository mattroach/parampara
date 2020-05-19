import React from 'react'
import ListUsers from './ListUsers'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const SuperAdminPage: React.FunctionComponent = () => {
  return (
    <Container>
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
