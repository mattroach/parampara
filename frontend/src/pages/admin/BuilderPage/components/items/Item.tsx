import React from 'react'
import { ScriptItem, ScriptItemType, ScriptActionType, ScriptAction } from 'types/scriptTypes'
import ChooseResponse from '../actions/ChooseResponse'
import Comment from '../actions/Comment'
import Image from './Image'
import Message from './Message'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import NewItemForm from './NewItemForm'

type Props = {
  item: ScriptItem
  position: number
}

const Item: React.FunctionComponent<Props> = ({ item, position }) => {
  const newItemPosition = useSelector((state: RootState) => state.scriptStore.newItemPosition)

  return (
    <>
      {newItemPosition === position && <NewItemForm position={position} />}
      <ItemMain item={item} position={position} />
      <Action action={item.action} position={position} />
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

const Action: React.FunctionComponent<{ action?: ScriptAction; position: number }> = ({
  action,
  position
}) => {
  const newResponseChoicePosition = useSelector(
    (state: RootState) => state.scriptStore.newResponseChoicePosition
  )

  switch (action?.type) {
    case ScriptActionType.ChooseResponse:
      return <ChooseResponse action={action} position={position} />
    case ScriptActionType.Comment:
      return <Comment position={position} />
    default:
      if (newResponseChoicePosition === position) return <ChooseResponse position={position} />
      return null
  }
}
