import React from 'react'
import { MultiSelectAction } from 'types/scriptTypes'
import { ProgressItem, MultiSelectResult } from 'types/sessionProgress'
import { MultiHumanBubble } from './HumanBubble'

type Props = {
  progressItem: ProgressItem
  actionProgress: MultiSelectResult
}

const ChosenMultiSelect: React.FunctionComponent<Props> = ({
  progressItem,
  actionProgress
}) => {
  // TODO improve typing with generics so this is not needed
  const action = progressItem.item.action as MultiSelectAction

  return (
    <MultiHumanBubble
      messages={actionProgress.choices.map(c => action?.responses[c].message)}
    />
  )
}

export default ChosenMultiSelect
