import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import { updateItem, removeItem } from 'store/slices/script'
import { MessageItem } from 'types/scriptTypes'
import styled from 'styled-components'
import MessageField from '../../MessageField'
import { useDispatch } from 'react-redux'

const ReadOnlyContent = styled.div`
  padding: 8px 13px;
  line-height: 1.3;
  display: inline-block;

  word-break: break-word;
  max-width: 400px;

  border-radius: 15px;
  background-color: #efefef;
  color: black;
`

const StyledTextarea = styled(MessageField)`
  width: 400px;
  display: block;
`

type Props = {
  item: MessageItem
  position: number
}

const EditableContent: React.FunctionComponent<Props> = ({ item, position }) => {
  const [editing, setEditing] = useState(false)
  const [messageDraft, setMessageDraft] = useState(item.message)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useDispatch()

  const submitEdit = (event?: any) => {
    event && event.preventDefault()

    setEditing(false)

    if (!messageDraft) {
      dispatch(removeItem(position))
      return
    }

    if (messageDraft === item.message) return //no changes

    const newItem: MessageItem = {
      ...item,
      message: messageDraft
    }

    dispatch(updateItem({ position, item: newItem }))
  }

  const handleMessageChange = (messageDraft: string) => {
    setMessageDraft(messageDraft)
  }

  return (
    <>
      {editing ? (
        <Form onSubmit={submitEdit}>
          <StyledTextarea
            theme="bot"
            inputRef={inputRef}
            onSubmit={submitEdit}
            value={messageDraft}
            onChange={handleMessageChange}
            onBlur={submitEdit}
            autoFocus
          />
        </Form>
      ) : (
        <ReadOnlyContent onClick={() => setEditing(true)}>{item.message}</ReadOnlyContent>
      )}
    </>
  )
}

export default EditableContent
