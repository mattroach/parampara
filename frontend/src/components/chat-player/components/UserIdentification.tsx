import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  initTimer,
  initEmptyProgress,
  createSessionProgress,
  MESSAGE_BASE_DELAY
} from 'store/slices/sessionProgress'
import EmailInput from './action-types/EmailInput'
import BotMessage from './item-types/BotMessage'
import HumanBubble from './item-types/HumanBubble'

type Props = {
  isPreviewMode: boolean
}

const UserIdentification: React.FunctionComponent<Props> = ({ isPreviewMode }) => {
  const allowAnon = useSelector(state => state.scriptStore.script!.allowAnon)
  const [askEmail, setAskEmail] = useState(false)
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    initTimer()

    if (allowAnon) {
      dispatch(initEmptyProgress({ isPreviewMode }))
    } else {
      setTimeout(() => {
        setAskEmail(true)
      }, MESSAGE_BASE_DELAY)
    }
  }, [dispatch, allowAnon, isPreviewMode])

  const onSubmit = (email: string) => {
    setAskEmail(false)
    setEmail(email)

    setTimeout(() => {
      dispatch(initEmptyProgress({ isPreviewMode }))
      if (!isPreviewMode) {
        dispatch(createSessionProgress(email))
      }
    }, MESSAGE_BASE_DELAY / 2) // divide by 2 as the server request time will add additional wait
  }

  if (allowAnon) return null

  return (
    <>
      <BotMessage message="Hello! Please enter your email to get started." />
      {askEmail && <EmailInput onSubmit={onSubmit} />}
      {email && <HumanBubble message={email} />}
    </>
  )
}

export default UserIdentification
