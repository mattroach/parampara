import React from 'react'
import { MultiChoiceAction } from 'types/scriptTypes'
import { ProgressItem, MultiChoiceResult } from 'types/sessionProgress'
import HumanBubble from './HumanBubble'

type Props = {
  progressItem: ProgressItem
  actionProgress: MultiChoiceResult
}

const ChosenMultiChoice: React.FunctionComponent<Props> = ({
  progressItem,
  actionProgress
}) => {
  // TODO improve typing with generics so this is not needed
  const action = progressItem.item.action as MultiChoiceAction

  return (
    <>
      {actionProgress.choices.map(choice => (
        <HumanBubble key={choice} message={action?.responses[choice].message} />
      ))}
    </>
  )
}

export default ChosenMultiChoice
