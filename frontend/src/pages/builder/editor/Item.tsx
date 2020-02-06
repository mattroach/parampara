import React from 'react'
import { ScriptItem, ScriptItemType } from '../../../types/scriptTypes'
import ChooseResponse from './items/ChooseResponse'
import Comment from './items/Comment'
import Image from './items/Image'
import Message from './items/Message'


type Props = {
  item: ScriptItem
  position: number
}

const Item: React.FunctionComponent<Props> = ({ item, position }) => {
  switch (item.type) {
    case ScriptItemType.ChooseResponse:
      return <ChooseResponse item={item} />
    case ScriptItemType.Comment:
      return <Comment item={item} position={position} />
    case ScriptItemType.Image:
      return <Image item={item} position={position} />
    case ScriptItemType.Message:
      return <Message item={item} position={position} />
  }
}

export default Item