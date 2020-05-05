import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: right;
`

const Navigation: React.FunctionComponent = () => (
  <Wrapper>
    <a href="#questions">Multiple choice</a> | <a href="#comments">Comments</a>
  </Wrapper>
)

export default Navigation
