import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { progressItemAndDelayNext } from 'store/slices/sessionProgress'

import { ScriptItem, ScriptItemType } from 'types/scriptTypes'
import BotMessage from './item-types/BotMessage'
import ChooseResponse from './item-types/ChooseResponse'
import Comment from './item-types/Comment'
import { RootState } from 'store/rootReducer'

// Todo: should it pull the item from redux instead of via a prop?
const NextItem: React.FunctionComponent<{ item: ScriptItem }> = ({ item }) => {
  const dispatch = useDispatch()
  const currentItemDelaying = useSelector((state: RootState) => state.sessionProgressStore.currentItemDelaying)

  if (currentItemDelaying)
    return null

  switch (item.type) {
    case ScriptItemType.Message:
      dispatch(progressItemAndDelayNext({ type: ScriptItemType.Message, item }))
      return <BotMessage message={item.message} />
    case ScriptItemType.ChooseResponse:
      return <ChooseResponse item={item} />
    case ScriptItemType.Comment:
      return <Comment item={item} />
    default:
      return <div>Not implemented {item.type}</div>
  }
}

export default NextItem