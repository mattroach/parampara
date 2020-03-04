import React from 'react'
import { MessageItem } from 'types/scriptTypes'
import ItemTemplate from '../components/ItemTemplate'
import EditableContent from './EditableContent'

type Props = {
  item: MessageItem
  position: number
}

const Message: React.FunctionComponent<Props> = ({ position, item }) => {
  return (
    <ItemTemplate position={position} item={item}>
      <EditableContent position={position} item={item} />
    </ItemTemplate>
  )
}

export default Message
