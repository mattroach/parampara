import React, { useState, useEffect } from 'react'

import ChooseResponse from '../action-types/ChooseResponse'
import Comment from '../action-types/Comment'
import SendEmail from '../action-types/SendEmail'
import { ScriptActionType, ScriptItem, ScriptAction } from 'types/scriptTypes'
import { MESSAGE_BASE_DELAY } from 'store/slices/sessionProgress'

type Props = {
  item: ScriptItem
  action: ScriptAction
}

const NextItemAction: React.FunctionComponent<Props> = ({ item, action }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, MESSAGE_BASE_DELAY)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  switch (action.type) {
    case ScriptActionType.ChooseResponse:
      return <ChooseResponse item={item} action={action} />
    case ScriptActionType.Comment:
      return <Comment item={item} action={action} />
    case ScriptActionType.CollectEmail:
      return <Comment item={item} action={action} /> // todo
    case ScriptActionType.SendEmail:
      return <SendEmail item={item} />
  }
}

export default NextItemAction
