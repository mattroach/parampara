import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { addAction, removeAction } from 'store/slices/script'
import { SendEmailAction, ScriptActionType } from 'types/scriptTypes'

type Props = {
  action: SendEmailAction
  position: number
}

const EditItem: React.FunctionComponent<Props> = ({ action, position }) => {
  const dispatch = useDispatch()
  const editItem = () => {
    const newVal = prompt(
      'What is the document URL? If sending multiple documents, separate the URLs with a comma.',
      action.content
    )

    if (newVal === null) {
      // cancelled
      return
    }

    if (newVal === '') {
      dispatch(removeAction(position))
      return
    }

    if (newVal !== action.content) {
      dispatch(
        addAction({
          position,
          action: { type: ScriptActionType.SendEmail, content: newVal }
        })
      )
    }
  }

  return (
    <Dropdown.Item as="button" onClick={editItem}>
      Edit
    </Dropdown.Item>
  )
}

export default EditItem
