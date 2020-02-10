import React from 'react'
import { CommentResult } from '../../../../types/sessionProgress'
import HumanBubble from './HumanBubble'

const ChosenResponse: React.FunctionComponent<{ actionProgress: CommentResult }> = ({ actionProgress }) => {
  return <HumanBubble message={actionProgress.content} />
}

export default ChosenResponse