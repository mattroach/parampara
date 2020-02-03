import React from 'react'

import { useDispatch } from 'react-redux'

import { progressItemAndDelayNext } from '../../../store/slices/sessionProgress'

import { ScriptItem, ScriptItemType } from '../../../types/scriptTypes'
import BotMessage from './item-types/BotMessage'
import ChooseResponse from './item-types/ChooseResponse'
import Comment from './item-types/Comment'

// Todo: should it pull the item from redux instead of via a prop?
const NextItem: React.FunctionComponent<{ item: ScriptItem }> = ({ item }) => {
  const dispatch = useDispatch()

  switch (item.type) {
    case ScriptItemType.Message:
      dispatch(progressItemAndDelayNext({ type: ScriptItemType.Message, item }))
      return <BotMessage message={item.message} />
    case ScriptItemType.ChooseResponse:
      return <ChooseResponse item={item} />
    case ScriptItemType.Comment:
      return <Comment item={item} />
    //default:
    //  return <div>Not implemented {item.type}</div>
  }
}

export default NextItem;