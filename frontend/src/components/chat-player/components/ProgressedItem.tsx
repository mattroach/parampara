import React from 'react'
import { ScriptActionType, ScriptItemType } from 'types/scriptTypes'
import { ActionResult, ProgressItem } from 'types/sessionProgress'
import BotMessage from './item-types/BotMessage'
import ChosenResponse from './item-types/ChosenResponse'
import Commented from './item-types/Commented'

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
  switch (progressItem.item.type) {
    case ScriptItemType.Message:
      return <BotMessage message={progressItem.item.message} />
    default:
      return <div>Progressed item {progressItem.item.type}</div>
  }
}

const ActionItem: React.FunctionComponent<{ progressItem: ProgressItem, actionProgress: ActionResult }> = ({ progressItem, actionProgress }) => {
  switch (actionProgress.type) {
    case ScriptActionType.ChooseResponse:
      return <ChosenResponse progressItem={progressItem} actionProgress={actionProgress} />
    case ScriptActionType.Comment:
      return <Commented actionProgress={actionProgress} />
    // default:
    //   return <div>Progressed item {itemProgress.item.type}</div>
  }
}