import React, { useEffect, useState } from 'react'
import { MESSAGE_BASE_DELAY } from 'store/slices/sessionProgress'
import { ScriptAction, ScriptActionType, ScriptItem } from 'types/scriptTypes'
import CollectEmail from '../action-types/CollectEmail'
import Comment from '../action-types/Comment'
import ChooseResponse from '../action-types/response/ChooseResponse'
import MultiSelect from '../action-types/response/MultiSelect'
import SendEmail from '../action-types/SendEmail'

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
    case ScriptActionType.MultiSelect:
      return <MultiSelect item={item} action={action} />
    case ScriptActionType.Comment:
      return <Comment item={item} />
    case ScriptActionType.CollectEmail:
      return <CollectEmail item={item} />
    case ScriptActionType.SendEmail:
      return <SendEmail item={item} />
    default:
      //@ts-ignore
      throw Error('unknown item ' + action.type)
  }
}

export default NextItemAction
