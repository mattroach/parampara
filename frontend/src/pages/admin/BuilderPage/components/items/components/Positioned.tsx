import React from 'react'
import styled from 'styled-components'
import { NavId } from '../styles'

const Wrapper = styled.div`
  position: relative;
`

const Position = styled(NavId)`
  position: absolute;
  top: 6px;
  left: -26px;
`

type Props = {
  position: number
  className?: string
}

const Positioned: React.FunctionComponent<Props> = ({
  position,
  children,
  className
}) => (
  <Wrapper className={className}>
    <Position>{position}</Position>
    {children}
  </Wrapper>
)

export default Positioned
