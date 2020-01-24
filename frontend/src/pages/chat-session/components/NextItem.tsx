import React from 'react'
import { ScriptItem } from '../../../types/scriptTypes';

const NextItem: React.FunctionComponent<{item: ScriptItem}> = ({item}) => {
  return <div>Next item {item.type}</div>
}

export default NextItem;