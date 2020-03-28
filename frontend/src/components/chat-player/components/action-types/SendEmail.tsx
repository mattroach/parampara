import React from 'react'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { useDispatch } from 'react-redux'
import { ScriptItem } from 'types/scriptTypes'

type Props = {
  item: ScriptItem
}

const SendEmail: React.FunctionComponent<Props> = ({ item }) => {
  const dispatch = useDispatch()

  dispatch(progressItemAndDelayNext({ item }))

  return null
}

export default SendEmail
