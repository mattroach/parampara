import RootContainer from 'layout/RootContainer'
import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'
import Navigation from './Navigation'
import PreviewButton from './PreviewButton'
import PublishButton from './PublishButton'
import Title from './Title'

const Wrapper = styled.section`
  background: #fafbfc;
  border-bottom: 1px solid #dee2e6;
`

const TitleWrap = styled.div`
  padding: 10px 0;
`
const StyledNav = styled(Navigation)`
  margin: 27px auto -1px auto;
`
const LastCol = styled(Col)`
  text-align: right;
  padding-top: 15px;
`

const Header: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <RootContainer>
        <Row>
          <Col>
            <TitleWrap>
              <Title />
            </TitleWrap>
          </Col>
          <Col xs="auto">
            <StyledNav />
          </Col>
          <LastCol>
            <PreviewButton />
            <PublishButton />
          </LastCol>
        </Row>
      </RootContainer>
    </Wrapper>
  )
}

export default Header
