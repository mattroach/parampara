import React, { useEffect } from 'react'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { useDispatch } from 'react-redux'
import { ScriptItem } from 'types/scriptTypes'

type Props = {
  item: ScriptItem
}

const SendEmail: React.FunctionComponent<Props> = ({ item }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(progressItemAndDelayNext({ item }))
  }, [dispatch, item])

  return null
}

export default SendEmail
