import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { MultiSelectAction, ScriptActionType, ScriptItem } from 'types/scriptTypes'
import Options from './Options'
import MultiResponseButton from './MultiResponseButton'
import GoButton from '../GoButton'

type Props = {
  item: ScriptItem
  action: MultiSelectAction
}

const MultiSelect: React.FunctionComponent<Props> = ({ action, item }) => {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const submit = (onSubmit: () => void) => (event: any) => {
    event.preventDefault()

    dispatch(
      progressItemAndDelayNext({
        actionResult: {
          type: ScriptActionType.MultiSelect,
          choices: Array.from(selected)
        },
        item
      })
    )

    onSubmit()
  }

  const toggleSelected = (position: number) => (isSelected: boolean) => {
    const newSet = new Set(selected)
    if (isSelected) {
      newSet.add(position)
    } else {
      newSet.delete(position)
    }
    setSelected(newSet)
  }

  return (
    <Options>
      {onSubmit => (
        <>
          {action.responses.map((response, i) => (
            <MultiResponseButton
              key={i}
              selected={selected.has(i)}
              onToggle={toggleSelected(i)}
            >
              {response.message}
            </MultiResponseButton>
          ))}
          <GoButton onClick={submit(onSubmit)} />
        </>
      )}
    </Options>
  )
}

export default MultiSelect
