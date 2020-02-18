import React from 'react'
import { ScriptActionType, ScriptItemType } from 'types/scriptTypes'
import { ActionResult, ProgressItem } from 'types/sessionProgress'
import BotMessage from './item-types/BotMessage'
import ChosenResponse from './item-types/ChosenResponse'
import Commented from './item-types/Commented'
import BotImage from './item-types/BotImage'

const ProgressedItem: React.FunctionComponent<{ progressItem: ProgressItem }> = ({ progressItem }) => {
  return (
    <>
      <ProgressedItemMain progressItem={progressItem} />
      {progressItem.actionResult && <ActionItem progressItem={progressItem} actionProgress={progressItem.actionResult} />}
    </>
  )
}

export default ProgressedItem

const ProgressedItemMain: React.FunctionComponent<{ progressItem: ProgressItem }> = ({ progressItem }) => {
  const animate = !progressItem.item.action
  switch (progressItem.item.type) {
    case ScriptItemType.Message:
      return <BotMessage message={progressItem.item.message} disableAnimateIn={!animate} />
    case ScriptItemType.Image:
      return <BotImage item={progressItem.item} disableAnimateIn={!animate} />
  }
}

const ActionItem: React.FunctionComponent<{ progressItem: ProgressItem, actionProgress: ActionResult }> = ({ progressItem, actionProgress }) => {
  switch (actionProgress.type) {
    case ScriptActionType.ChooseResponse:
      return <ChosenResponse progressItem={progressItem} actionProgress={actionProgress} />
    case ScriptActionType.Comment:
      return <Commented actionProgress={actionProgress} />
  }
}
