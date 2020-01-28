import React from 'react'
import { CommentItemProgress } from '../../../../types/sessionProgress';
import HumanBubble from './HumanBubble';

const ChosenResponse: React.FunctionComponent<{ itemProgress: CommentItemProgress }> = ({ itemProgress }) => {
  return <HumanBubble message={itemProgress.progress.content} />
}

export default ChosenResponse;