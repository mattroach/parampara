import React from 'react'
import {
  ScriptItem,
  ScriptItemType,
  ScriptActionType,
  ScriptAction
} from 'types/scriptTypes'
import ChooseResponse from '../actions/ChooseResponse'
import MultiSelect from '../actions/MultiSelect'
import Comment from '../actions/UserInput/Comment'
import SendEmail from '../actions/SendEmail'
import Image from './Image'
import Message from './Message'
import { useSelector } from 'react-redux'
import NewItemForm from './NewItemForm'
import CollectEmail from '../actions/UserInput/CollectEmail'

type Props = {
  item: ScriptItem
  position: number
}

const Item: React.FunctionComponent<Props> = ({ item, position }) => {
  const newItemPosition = useSelector(state => state.scriptStore.newItemPosition)

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
  const lastPos = useSelector(state => state.scriptStore.script!.version.items.length) - 1
  const newAction = useSelector(state => state.scriptStore.newAction)

  switch (action?.type) {
    case ScriptActionType.ChooseResponse:
      return <ChooseResponse action={action} position={position} />
    case ScriptActionType.MultiSelect:
      return <MultiSelect action={action} position={position} />
    case ScriptActionType.Comment:
      return <Comment position={position} />
    case ScriptActionType.CollectEmail:
      return <CollectEmail position={position} />
    case ScriptActionType.SendEmail:
      return <SendEmail action={action} position={position} />
    default:
      if (newAction?.position === position) {
        if (newAction.type === ScriptActionType.ChooseResponse)
          return <ChooseResponse position={position} autoFocus={true} />
        else return <MultiSelect position={position} autoFocus={true} />
      } else if (position === lastPos) {
        return <ChooseResponse position={position} />
      }
      return null
  }
}
