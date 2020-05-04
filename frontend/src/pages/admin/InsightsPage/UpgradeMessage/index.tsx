import React from 'react'
import styled from 'styled-components'
import FakeInsights from './FakeInsights'
import Banner from './Banner'

const Wrapper = styled.section`
  padding: 0 20px;
  position: relative;
`

const UpgradeMessage: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Banner />
      <FakeInsights />
    </Wrapper>
  )
}

export default UpgradeMessage
