import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const StyledRow = styled(Row)`
  padding: 0 20px;
`

const SummaryStats: React.FunctionComponent = () => {
  return (
    <StyledRow>
      <Col>a</Col>
      <Col>a</Col>
      <Col>a</Col>
      <Col>a</Col>
      <Col>a</Col>
    </StyledRow>
  )
}

export default SummaryStats
