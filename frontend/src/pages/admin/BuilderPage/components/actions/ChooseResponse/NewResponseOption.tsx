import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  appendResponseOption,
  cancelResponseChoiceForm,
  addAction
} from 'store/slices/script'
import { DraftResponseOption } from '../components/Response/ResponseOption'
import { ScriptActionType } from 'types/scriptTypes'

type Props = {
  position: number
  mode: 'append' | 'new'
  autoFocus?: boolean
}

const NewResponseOption: React.FunctionComponent<Props> = ({
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
            type: ScriptActionType.ChooseResponse,
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
      onSubmit={onSubmit}
      value={value}
      setValue={setValue}
      autoFocus={autoFocus}
      placeholder={mode === 'new' ? 'Add response...' : 'Add...'}
    />
  )
}

export default NewResponseOption
