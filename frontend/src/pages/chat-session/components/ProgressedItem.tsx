import React from 'react'
import { ProgressItem } from '../../../types/sessionProgress';

const ProgressedItem: React.FunctionComponent<{itemProgress: ProgressItem}> = ({itemProgress}) => {
  return <div>Progressed item {itemProgress.item.type}</div>
}

export default ProgressedItem;