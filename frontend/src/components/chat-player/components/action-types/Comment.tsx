import React from 'react'
import { useDispatch } from 'react-redux'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { ScriptActionType, ScriptItem } from 'types/scriptTypes'
import TextInput from './TextInput'

type Props = {
  item: ScriptItem
}

const Comment: React.FunctionComponent<Props> = ({ item }) => {
  const dispatch = useDispatch()

  const handleSubmit = (content: string) => {
    dispatch(
      progressItemAndDelayNext({
        actionResult: {
          type: ScriptActionType.Comment,
          content
        },
        item
      })
    )
  }

  return <TextInput placeholder="Type here..." onSubmit={handleSubmit} />
}

export default Comment
