import React from 'react'
import { ProgressItem } from '../../../types/sessionProgress';
import { ScriptItemType } from '../../../types/scriptTypes';
import BotMessage from './item-types/BotMessage';
import ChosenResponse from './item-types/ChosenResponse';

const ProgressedItem: React.FunctionComponent<{ itemProgress: ProgressItem }> = ({ itemProgress }) => {  
  switch (itemProgress.type) {
    case ScriptItemType.Message:
      return <BotMessage item={itemProgress.item} />
    case ScriptItemType.ChooseResponse:
      return <ChosenResponse itemProgress={itemProgress} />
    default:
      return <div>Progressed item {itemProgress.item.type}</div>
    }
}

export default ProgressedItem;