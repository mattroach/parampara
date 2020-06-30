import React from 'react'
import { useDispatch } from 'react-redux'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { MultiChoiceAction, ScriptActionType, ScriptItem } from 'types/scriptTypes'
import Options from './Options'
import ResponseButton from './ResponseButton'

type Props = {
  item: ScriptItem
  action: MultiChoiceAction
}

const MultiChoice: React.FunctionComponent<Props> = ({ action, item }) => {
  const dispatch = useDispatch()

  const handleClick = (onSubmit: () => void, choice: number) => (event: any) => {
    event.preventDefault()

    dispatch(
      progressItemAndDelayNext({
        actionResult: {
          type: ScriptActionType.MultiChoice,
          choices: [choice]
        },
        item
      })
    )

    onSubmit()
  }

  return (
    <Options>
      {onSubmit =>
        action.responses.map((response, i) => (
          <ResponseButton key={i} onClick={handleClick(onSubmit, i)}>
            {response.message}
          </ResponseButton>
        ))
      }
    </Options>
  )
}

export default MultiChoice
