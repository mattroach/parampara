import React from 'react'
import { useSelector } from 'react-redux'
import ItemNavigationForm from './ItemNavigationForm'

type Props = {
  position: number
  currentValue?: number
  onSelect: (nextId: number) => void
  onBlur?: () => void
}

const ItemNavigationFormContainer: React.FunctionComponent<Props> = ({
  position,
  currentValue,
  onSelect,
  onBlur
}) => {
  const items = useSelector(state => state.scriptStore.script!.version.items)

  return (
    <ItemNavigationForm
      items={items}
      position={position}
      currentValue={currentValue}
      onSelect={onSelect}
      onBlur={onBlur}
    />
  )
}

export default ItemNavigationFormContainer
