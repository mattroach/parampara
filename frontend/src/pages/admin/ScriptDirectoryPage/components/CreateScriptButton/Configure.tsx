import React, { useState, ChangeEvent, useRef } from 'react'
import { useHistory } from 'react-router'

import AppButton from 'components/AppButton'
import api from 'api'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useEffect } from 'react'

type Props = {
  adminId: string
  isConfiguring: boolean
  onHide: () => void
}

const Configure: React.FunctionComponent<Props> = ({
  adminId,
  isConfiguring,
  onHide
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const history = useHistory()
  const isFormValid = title !== ''

  useEffect(() => {
    if (isConfiguring) inputRef.current!.focus()
  }, [isConfiguring])

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value)

  const createParampara = (event: any) => {
    event.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)

    api
      .createScript(adminId, { title })
      .then(scriptId => history.push(`/builder/${adminId}/${scriptId}/create`))
  }

  return (
    <Modal show={isConfiguring} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new Parampara</Modal.Title>
      </Modal.Header>
      <Form onSubmit={createParampara}>
        <Modal.Body>
          <Form.Control
            ref={inputRef as any}
            value={title}
            onChange={onTitleChange}
            placeholder="Add Parampara title"
          />
        </Modal.Body>
        <Modal.Footer>
          <AppButton isLoading={isLoading} disabled={!isFormValid} type="submit">
            Create Parampara
          </AppButton>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default Configure
