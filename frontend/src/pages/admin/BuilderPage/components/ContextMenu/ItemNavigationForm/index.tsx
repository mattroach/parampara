import React, { RefObject } from 'react'
import ItemNavigationForm from './ItemNavigationForm'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

type Props = {
  focusRef: RefObject<any>
  position: number
  currentValue?: number
  onSelect: (nextId: number) => void
}

const ItemNavigationFormContainer: React.FunctionComponent<Props> = ({
  focusRef,
  position,
  currentValue,
  onSelect
}) => {
  const items = useSelector((state: RootState) => state.scriptStore.script!.version.items)

  return (
    <ItemNavigationForm
      focusRef={focusRef}
      items={items}
      position={position}
      currentValue={currentValue}
      onSelect={onSelect}
    />
  )
}

export default ItemNavigationFormContainer
