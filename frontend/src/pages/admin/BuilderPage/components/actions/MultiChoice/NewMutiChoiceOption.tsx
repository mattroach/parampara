import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addAction,
  appendResponseOption,
  cancelResponseChoiceForm
} from 'store/slices/script'
import { ScriptActionType } from 'types/scriptTypes'
import { DraftResponseOption } from '../components/Response/ResponseOption'
import Checkbox from './Checkbox'

type Props = {
  position: number
  mode: 'append' | 'new'
  autoFocus?: boolean
}

const NewMultiChoiceOption: React.FunctionComponent<Props> = ({
  position,
  mode,
  autoFocus
}) => {
  const [value, setValue] = useState<string>('')

  const dispatch = useDispatch()

  const onClear = () => {
    if (mode === 'new') dispatch(cancelResponseChoiceForm())
  }

  const onSubmit = (message: string) => {
    if (mode === 'new') {
      dispatch(
        addAction({
          action: {
            type: ScriptActionType.MultiChoice,
            responses: [{ message }]
          },
          position
        })
      )
    } else {
      dispatch(
        appendResponseOption({
          position,
          option: message
        })
      )
    }

    setValue('')
  }

  return (
    <DraftResponseOption
      onClear={onClear}
      renderBefore={() => <Checkbox />}
      onSubmit={onSubmit}
      value={value}
      setValue={setValue}
      autoFocus={autoFocus}
    />
  )
}

export default NewMultiChoiceOption
