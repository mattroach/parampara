import React from 'react'
import { ChooseResponseAction } from 'types/scriptTypes'
import {
  ProgressItem,
  ChooseResponseResult,
  MultiChoiceResult
} from 'types/sessionProgress'
import HumanBubble from './HumanBubble'

type Props = {
  progressItem: ProgressItem
  actionProgress: ChooseResponseResult | MultiChoiceResult
}

const ChosenResponse: React.FunctionComponent<Props> = ({
  progressItem,
  actionProgress
}) => {
  // TODO improve typing with generics so this is not needed
  const action = progressItem.item.action as ChooseResponseAction

  const { message } = action?.responses[actionProgress.choice]

  return <HumanBubble message={message} />
}

export default ChosenResponse
