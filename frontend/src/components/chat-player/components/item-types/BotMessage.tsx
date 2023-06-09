import React from 'react'
import styled from 'styled-components'
import ItemWrap from './ItemWrap'
import ChatFormat from 'components/ChatFormat'

const Bubble = styled.span`
  display: inline-block;
  background-color: #efefef;
  border-radius: 15px;
  padding: 7px 13px;
  line-height: 1.3;
  word-break: break-word;
`

type Props = {
  message: string
  disableAnimateIn?: boolean
}

const BotMessage: React.FunctionComponent<Props> = ({ message, disableAnimateIn }) => {
  return (
    <ItemWrap disableAnimateIn={disableAnimateIn}>
      <Bubble>
        <ChatFormat>{message}</ChatFormat>
      </Bubble>
    </ItemWrap>
  )
}

export default BotMessage
