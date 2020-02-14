import React, { useState, useEffect } from 'react'

import ChooseResponse from '../action-types/ChooseResponse'
import Comment from '../action-types/Comment'
import { ScriptActionType, ScriptItem, ScriptAction } from 'types/scriptTypes'
import { MESSAGE_BASE_DELAY } from 'store/slices/sessionProgress'

const NextItemAction: React.FunctionComponent<{ item: ScriptItem, action: ScriptAction }> = ({ item, action }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, MESSAGE_BASE_DELAY)
  })

  if (!show)
    return null

  switch (action.type) {
    case ScriptActionType.ChooseResponse:
      return <ChooseResponse item={item} action={action} />
    case ScriptActionType.Comment:
      return <Comment item={item} action={action} />
  }
}

export default NextItemAction