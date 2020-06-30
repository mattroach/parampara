import React from 'react'
import styled from 'styled-components'
import ItemWrap from './ItemWrap'

const Wrapper = styled(ItemWrap)`
  margin: 20px 0;

  text-align: right;
`

const Bubble = styled.span`
  display: inline-block;
  border-radius: 15px;
  padding: 7px 13px;
  line-height: 1.3;
  text-align: left;

  background-color: #0076ff;
  color: white;

  margin-left: 8px; /* needed for MultiHumanBubble */
`

const HumanBubble: React.FunctionComponent<{ message: string }> = ({ message }) => {
  return (
    <Wrapper>
      <Bubble>{message}</Bubble>
    </Wrapper>
  )
}

export default HumanBubble

export const MultiHumanBubble: React.FunctionComponent<{ messages: string[] }> = ({
  messages
}) => {
  return (
    <Wrapper>
      {messages.map((message, i) => (
        <Bubble key={i}>{message}</Bubble>
      ))}
    </Wrapper>
  )
}
