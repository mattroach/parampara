import React from 'react'
import styled from 'styled-components'
import { MessageItem } from 'types/scriptTypes'
import ItemTemplate from '../components/ItemTemplate'
import EditableContent from './EditableContent'

const BotBubble = styled.div`
  padding: 7px 13px;
  line-height: 1.3;
  display: inline-block;
  
  max-width: 400px;

  border-radius: 15px;
  background-color: #efefef;
  color: black;
`

type Props = {
  item: MessageItem
  position: number
}

const Message: React.FunctionComponent<Props> = ({ position, item }) => {
  return (
    <ItemTemplate position={position} item={item}>
      <BotBubble>
        <EditableContent position={position} item={item} />
      </BotBubble>
    </ItemTemplate>
  )
}

export default Message
