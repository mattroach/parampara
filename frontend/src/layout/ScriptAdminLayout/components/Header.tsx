import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import Navigation from './Navigation'
import Title from './Title'
import PreviewButton from './PreviewButton'
import PublishButton from './PublishButton'

const Wrapper = styled.div`
  background: #fafbfc;
  padding: 0 20px 0 10px;
  border-bottom: 1px solid #dee2e6;
`
const TitleWrap = styled.div`
  padding: 10px 0;
`
const StyledNav = styled(Navigation)`
  width: 260px;
  margin: 27px auto -1px auto;
`
const LastCol = styled(Col)`
  text-align: right;
  padding-top: 15px;
`

const Header: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Row>
        <Col>
          <TitleWrap>
            <Title />
          </TitleWrap>
        </Col>
        <Col>
          <StyledNav />
        </Col>
        <LastCol>
          <PreviewButton />
          <PublishButton />
        </LastCol>
      </Row>
    </Wrapper>
  )
}

export default Header
