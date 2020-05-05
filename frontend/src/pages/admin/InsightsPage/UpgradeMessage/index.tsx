import React from 'react'
import styled from 'styled-components'
import FakeInsights from './FakeInsights'
import Banner from './Banner'
import RootContainer from 'layout/RootContainer'

const Wrapper = styled.div`
  position: relative;
`

const UpgradeMessage: React.FunctionComponent = () => {
  return (
    <RootContainer>
      <Wrapper>
        <Banner />
        <FakeInsights />
      </Wrapper>
    </RootContainer>
  )
}

export default UpgradeMessage
