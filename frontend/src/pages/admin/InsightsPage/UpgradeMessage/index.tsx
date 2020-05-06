import React from 'react'
import styled from 'styled-components'
import FakeInsights from './FakeInsights'
import Banner from './Banner'
import RootContainer from 'layout/RootContainer'

const Wrapper = styled.div`
  position: relative;
`

const Cover = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  z-index: 4;
  background: rgba(235, 235, 235, 0.5);
`
const UpgradeMessage: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Cover />
      <RootContainer>
        <Banner />
        <FakeInsights />
      </RootContainer>
    </Wrapper>
  )
}

export default UpgradeMessage
