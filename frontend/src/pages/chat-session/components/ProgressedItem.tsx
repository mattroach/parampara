import React from 'react'
import { ProgressItem } from '../../../types/sessionProgress';
import { ScriptItemType } from '../../../types/scriptTypes';
import BotMessage from './item-types/BotMessage';

const ProgressedItem: React.FunctionComponent<{ itemProgress: ProgressItem }> = ({ itemProgress }) => {
  const { item } = itemProgress;
  
  switch (item.type) {
    case ScriptItemType.Message:
      return <BotMessage item={item} />
    default:
      return <div>Progressed item {itemProgress.item.type}</div>
    }
}

export default ProgressedItem;