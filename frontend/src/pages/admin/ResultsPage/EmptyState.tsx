import React from 'react'
import styled from 'styled-components'
import RootContainer from 'layout/RootContainer'

const Wrapper = styled(RootContainer)`
  color: #666;
`

const EmptyState: React.FunctionComponent = () => {
  return (
    <Wrapper>
      No results yet. Once your Parampara is published and shared, your results will
      appear here.
    </Wrapper>
  )
}

export default EmptyState
