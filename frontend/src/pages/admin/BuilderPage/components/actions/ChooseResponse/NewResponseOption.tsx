import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  appendResponseOption,
  cancelResponseChoiceForm,
  addAction
} from 'store/slices/script'
import ResponseOption from '../components/Response/ResponseOption'
import { ScriptActionType } from 'types/scriptTypes'
import styled from 'styled-components'

const StyledResponseOption = styled(ResponseOption)`
  > .bubble {
    border: 1px solid rgba(0, 107, 250, 0.6);
    :focus-within {
      border: 1px solid #006bfa;
    }
  }

  input {
    min-width: 44px;
  }
`

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
    <StyledResponseOption
      onClear={onClear}
      onSubmit={onSubmit}
      value={value}
      setValue={setValue}
      autoFocus={mode === 'new'}
    />
  )
}

export default NewResponseOption
