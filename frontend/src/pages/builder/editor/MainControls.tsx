import React from 'react';
import styled from 'styled-components';

import BotControls from './BotControls';
import HumanControls from './HumanControls';

const Wrapper = styled.div`
  border-top: 2px solid #eee;
  padding-top: 8px;
  margin-top: 50px;
`

const MainControls: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <BotControls />
      <HumanControls />
    </Wrapper>
  )
}

export default MainControls