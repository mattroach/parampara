import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 10px 0;
  overflow: hidden;
`;

const AnimatedContent = styled.span`
  display: inline-block;
  max-width: 75%;

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-10%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  animation: .1s linear 0s 1 slideInFromLeft;
`;

const ItemWrap: React.FunctionComponent<{className?: string}> = ({ children, className }) => {
  return (
    <Wrapper className={className}>
      <AnimatedContent>{children}</AnimatedContent>
    </Wrapper>
  ) 
}

export default ItemWrap;