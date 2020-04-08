import React from 'react'
import { useDispatch } from 'react-redux'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { ScriptActionType, ScriptItem } from 'types/scriptTypes'
import EmailInput from './EmailInput'

type Props = {
  item: ScriptItem
}

const CollectEmail: React.FunctionComponent<Props> = ({ item }) => {
  const dispatch = useDispatch()

  const handleSubmit = (content: string) => {
    dispatch(
      progressItemAndDelayNext({
        actionResult: {
          type: ScriptActionType.CollectEmail,
          content
        },
        item
      })
    )
  }

  return <EmailInput onSubmit={handleSubmit} />
}

export default CollectEmail
