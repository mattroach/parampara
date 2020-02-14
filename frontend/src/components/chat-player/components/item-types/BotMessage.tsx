import React from 'react'
import styled from 'styled-components'
import ItemWrap from './ItemWrap'

const Bubble = styled.span`
  display: inline-block;
  background-color: #efefef;
  border-radius: 15px;
  padding: 7px 13px;
  line-height: 1.3;
`

type Props = {
  message: string
  disableAnimateIn?: boolean
}
const BotMessage: React.FunctionComponent<Props> = ({ message, disableAnimateIn }) => {
  return (
    <ItemWrap disableAnimateIn={disableAnimateIn}>
      <Bubble>{message}</Bubble>
    </ItemWrap>
  )
}

export default BotMessage