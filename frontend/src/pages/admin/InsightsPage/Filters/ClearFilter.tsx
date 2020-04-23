import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFilter } from 'store/slices/scriptInsights'
import IconButton from 'components/IconButton'

export const ICON_WIDTH = 25

const ClearFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const clearFilter = () => dispatch(removeFilter())

  return <IconButton icon="close" onClick={clearFilter} iconSize={ICON_WIDTH} />
}

export default ClearFilter
