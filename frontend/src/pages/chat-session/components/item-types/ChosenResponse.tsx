import React from 'react'
import { ChooseResponseItemProgress } from '../../../../types/sessionProgress';
import HumanBubble from './HumanBubble';

const ChosenResponse: React.FunctionComponent<{ itemProgress: ChooseResponseItemProgress }> = ({ itemProgress }) => {
  const { message } = itemProgress.item.responses[itemProgress.progress.choice];

  return <HumanBubble message={message} />
}

export default ChosenResponse;