import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 10px 0;
`

const AnimatedContent = styled.span<{ disableAnimateIn?: boolean; unlimitedWidth?: boolean }>`
  display: inline-block;
  ${props => !props.unlimitedWidth && 'max-width: 75%;'}

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-10px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  ${props => !props.disableAnimateIn && 'animation: .3s ease 0s 1 slideInFromLeft;'};
`

type Props = {
  className?: string
  disableAnimateIn?: boolean
  unlimitedWidth?: boolean
  children: React.ReactNode
}

const ItemWrap: React.RefForwardingComponent<HTMLDivElement, Props> = (
  { children, className, disableAnimateIn, unlimitedWidth },
  ref
) => {
  return (
    <Wrapper className={className} ref={ref}>
      <AnimatedContent disableAnimateIn={disableAnimateIn} unlimitedWidth={unlimitedWidth}>
        {children}
      </AnimatedContent>
    </Wrapper>
  )
}

export default forwardRef(ItemWrap)
