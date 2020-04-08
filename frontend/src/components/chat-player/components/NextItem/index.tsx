import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { ScriptItem, ScriptItemType } from 'types/scriptTypes'
import BotMessage from '../item-types/BotMessage'
import NextItemAction from './NextItemAction'
import BotImage from '../item-types/BotImage'

// Todo: should it pull the item from redux instead of via a prop?
const NextItem: React.FunctionComponent<{ item: ScriptItem }> = ({ item }) => {
  const currentItemDelaying = useSelector(
    (state: RootState) => state.sessionProgressStore.currentItemDelaying
  )

  if (currentItemDelaying) return null

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

  useEffect(() => {
    if (!item.action) {
      dispatch(progressItemAndDelayNext({ item }))
    }
  }, [dispatch, item])

  switch (item.type) {
    case ScriptItemType.Message:
      return <BotMessage message={item.message} />
    case ScriptItemType.Image:
      return <BotImage item={item} />
  }
}
