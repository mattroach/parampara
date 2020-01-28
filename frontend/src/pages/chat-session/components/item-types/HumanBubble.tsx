import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px 0;

  text-align: right;
`;

const Bubble = styled.span`
  display: inline-block;
  border-radius: 15px;
  padding: 7px 13px;
  max-width: 75%;
  line-height: 1.3;

  background-color: #0076ff;
  color: white;
`;

const HumanBubble: React.FunctionComponent<{ message: string }> = ({ message }) => {
  return (
    <Wrapper>
      <Bubble>{message}</Bubble>
    </Wrapper>
  )
}

export default HumanBubble;