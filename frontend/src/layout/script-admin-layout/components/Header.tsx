import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

import Navigation from './Navigation';
import Title from './Title';

const Wrapper = styled.div`
  background: #fafbfc;
  padding: 0 20px 0 20px;
  border-bottom: 1px solid #dee2e6;
`
const TitleWrap = styled.div`
  padding: 10px 0;
`
const StyledNav = styled(Navigation)`
  width: 260px;
  margin: 27px auto -1px auto;
`
const Share = styled.div`
  text-align: right;
`

const Header: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Row>
        <Col><TitleWrap><Title /></TitleWrap></Col>
        <Col>
          <StyledNav />
        </Col>
        <Col><Share></Share></Col>
      </Row>
    </Wrapper>
  )
}

export default Header