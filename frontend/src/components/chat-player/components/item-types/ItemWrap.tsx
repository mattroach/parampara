import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 10px 0;
  overflow: hidden;
`

const AnimatedContent = styled.span<{ disableAnimateIn?: boolean }>`
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
  ${props => !props.disableAnimateIn && 'animation: .1s linear 0s 1 slideInFromLeft;'};
`

type Props = {
  className?: string
  disableAnimateIn?: boolean
}

const ItemWrap: React.FunctionComponent<Props> = ({ children, className, disableAnimateIn }) => {
  return (
    <Wrapper className={className}>
      <AnimatedContent disableAnimateIn={disableAnimateIn}>{children}</AnimatedContent>
    </Wrapper>
  )
}

export default ItemWrap