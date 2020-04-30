import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSelect, selectAll, unselectAll } from 'store/slices/scriptResults'
import { RootState } from 'store/rootReducer'

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  font-size: 1rem;
`
enum SelectState {
  All,
  Some,
  None
}

function calculateState(numSelected: number, numFetched: number) {
  if (numSelected === 0) return SelectState.None
  if (numSelected === numFetched) {
    return SelectState.All
  }
  return SelectState.Some
}

export const SelectAll: React.FunctionComponent = () => {
  const numSelected = useSelector(
    (state: RootState) => Object.keys(state.scriptResultsStore.selected).length
  )

  const numFetched = useSelector(
    (state: RootState) => state.scriptResultsStore.data!.length
  )

  const ref = useRef<HTMLInputElement>(null)

  const selectState = calculateState(numSelected, numFetched)

  useEffect(() => {
    ref.current!.indeterminate = selectState === SelectState.Some
  }, [selectState])

  const dispatch = useDispatch()

  const onChange = () => {
    if (selectState === SelectState.None) {
      dispatch(selectAll())
    } else {
      dispatch(unselectAll())
    }
  }

  return (
    <Checkbox
      ref={ref}
      checked={selectState === SelectState.All || selectState === SelectState.Some}
      onChange={onChange}
    />
  )
}

type SelectProps = { sessionId: string }
export const Select: React.FunctionComponent<SelectProps> = ({ sessionId }) => {
  const selected = Boolean(
    useSelector((state: RootState) => state.scriptResultsStore.selected[sessionId])
  )
  const dispatch = useDispatch()

  return (
    <Checkbox onChange={() => dispatch(toggleSelect(sessionId))} checked={selected} />
  )
}
