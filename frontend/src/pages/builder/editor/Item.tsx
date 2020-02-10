import React from 'react'
import { ScriptItem, ScriptItemType, ScriptActionType, ScriptAction } from 'types/scriptTypes'
import ChooseResponse from './actions/ChooseResponse'
import Comment from './actions/Comment'
import Image from './items/Image'
import Message from './items/Message'


type Props = {
  item: ScriptItem
  position: number
}

const Item: React.FunctionComponent<Props> = ({ item, position }) => {
  return (
    <>
      <ItemMain item={item} position={position} />
      {item.action && <Action action={item.action} position={position} />}
    </>
  )
}

export default Item

const ItemMain: React.FunctionComponent<Props> = ({ item, position }) => {
  switch (item.type) {
    case ScriptItemType.Image:
      return <Image item={item} position={position} />
    case ScriptItemType.Message:
      return <Message item={item} position={position} />
  }
}

const Action: React.FunctionComponent<{ action: ScriptAction, position: number }> = ({ action, position }) => {
  switch (action.type) {
    case ScriptActionType.ChooseResponse:
      return <ChooseResponse action={action} position={position} />
    case ScriptActionType.Comment:
      return <Comment position={position} />
  }
}