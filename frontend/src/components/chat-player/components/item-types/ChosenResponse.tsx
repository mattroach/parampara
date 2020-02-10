import React from 'react'
import { ScriptActionType } from 'types/scriptTypes'
import { ProgressItem, ChooseResponseResult } from 'types/sessionProgress'
import HumanBubble from './HumanBubble'

type Props = {
  progressItem: ProgressItem
  actionProgress: ChooseResponseResult
}

const ChosenResponse: React.FunctionComponent<Props> = ({ progressItem, actionProgress }) => {
  // TODO improve typing with generics so this is not needed
  if (progressItem.item.action?.type !== ScriptActionType.ChooseResponse)
    throw new Error('Type error')

  const { message } = progressItem.item.action?.responses[actionProgress.choice]

  return <HumanBubble message={message} />
}

export default ChosenResponse