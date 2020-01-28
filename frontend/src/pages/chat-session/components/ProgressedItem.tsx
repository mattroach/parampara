import React from 'react'
import { ProgressItem, ChooseResponseItemProgress } from '../../../types/sessionProgress';
import { ScriptItemType } from '../../../types/scriptTypes';
import BotMessage from './item-types/BotMessage';
import ChosenResponse from './item-types/ChosenResponse';

const ProgressedItem: React.FunctionComponent<{ itemProgress: ProgressItem }> = ({ itemProgress }) => {
  const { item } = itemProgress;
  
  switch (item.type) {
    case ScriptItemType.Message:
      return <BotMessage item={item} />
    case ScriptItemType.ChooseResponse:
      // BUG: unsure why it cannot infer that itemProgress is ChooseResponseItemProgress
      return <ChosenResponse itemProgress={itemProgress as ChooseResponseItemProgress} />
    default:
      return <div>Progressed item {itemProgress.item.type}</div>
    }
}

export default ProgressedItem;