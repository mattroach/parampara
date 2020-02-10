import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { ScriptAction, ScriptActionType, ScriptItem, ScriptItemType } from 'types/scriptTypes'
import ChooseResponse from './action-types/ChooseResponse'
import Comment from './action-types/Comment'
import BotMessage from './item-types/BotMessage'


// Todo: should it pull the item from redux instead of via a prop?
const NextItem: React.FunctionComponent<{ item: ScriptItem }> = ({ item }) => {
  const currentItemDelaying = useSelector((state: RootState) => state.sessionProgressStore.currentItemDelaying)

  if (currentItemDelaying)
    return null

  return (
    <>
      <NextItemMain item={item} />
      {item.action && <NextItemAction item={item} action={item.action} />}
    </>
  )
}

export default NextItem

const NextItemMain: React.FunctionComponent<{ item: ScriptItem }> = ({ item }) => {
  const dispatch = useDispatch()

  switch (item.type) {
    case ScriptItemType.Message:
      if (!item.action)
        dispatch(progressItemAndDelayNext({ item }))

      return <BotMessage message={item.message} />
    default:
      return <div>Not implemented {item.type}</div>
  }
}

const NextItemAction: React.FunctionComponent<{ item: ScriptItem, action: ScriptAction }> = ({ item, action }) => {
  switch (action.type) {
    case ScriptActionType.ChooseResponse:
      return <ChooseResponse item={item} action={action} />
    case ScriptActionType.Comment:
      return <Comment item={item} action={action} />
  }
}