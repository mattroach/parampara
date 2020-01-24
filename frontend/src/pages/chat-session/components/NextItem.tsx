import React from 'react'

import { useDispatch } from 'react-redux'

import { progressItemOnTimer } from '../../../store/slices/sessionProgress';

import { ScriptItem, ScriptItemType } from '../../../types/scriptTypes'
import BotMessage from './item-types/BotMessage'
import ChooseResponse from './item-types/ChooseResponse';

// Todo: should it pull the item from redux instead of via a prop?
const NextItem: React.FunctionComponent<{ item: ScriptItem }> = ({ item }) => {
  const dispatch = useDispatch()

  switch (item.type) {
    case ScriptItemType.Message:
      dispatch(progressItemOnTimer(item))
      return <BotMessage item={item} />
    case ScriptItemType.ChooseResponse:
      return <ChooseResponse item={item} />
    default:
      return <div>Not implemented {item.type}</div>
  }
}

export default NextItem;