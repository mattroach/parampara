import React from 'react'
import { CommentResult, CollectEmailResult } from '../../../../types/sessionProgress'
import HumanBubble from './HumanBubble'

type Props = {
  actionProgress: CommentResult | CollectEmailResult
}
const ChosenResponse: React.FunctionComponent<Props> = ({ actionProgress }) => {
  return <HumanBubble message={actionProgress.content} />
}

export default ChosenResponse
