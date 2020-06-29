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
}

const NewResponseOption: React.FunctionComponent<Props> = ({ position, mode }) => {
  const [value, setValue] = useState<string | undefined>(undefined)

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
      autoFocus={mode === 'new'}
    />
  )
}

export default NewResponseOption
