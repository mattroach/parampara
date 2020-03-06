import React from 'react'
import styled from 'styled-components'
import graphic from './graphic.png'

const Wrapper = styled.div`
  text-align: center;
  color: #777;
  img {
    display: block;
    margin: 0 auto;
  }
`

const EmptyState: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <img alt="empty" src={graphic} width={202} height={202} />
      Woohoo, a new Parampara! Get started by adding some messages below.
    </Wrapper>
  )
}

export default EmptyState
