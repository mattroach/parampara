import React, { useState } from 'react'
import { ListedScript } from 'types/scriptTypes'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { deleteScript } from 'store/slices/scripts'
import AppButton from 'components/AppButton'
import Button from 'react-bootstrap/Button'
import AppDowndownItem from 'components/menu/AppDropdownItem'

type Props = {
  script: ListedScript
}

const DeleteButton: React.FunctionComponent<Props> = ({ script }) => {
  const dispatch = useDispatch()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const askForConfirmation = () => setConfirming(true)
  const closeConfirmation = () => setConfirming(false)

  const confirmScriptDelete = () => {
    setDeleting(true)
    dispatch(deleteScript(script.id))
  }
  return (
    <>
      <AppDowndownItem onClick={askForConfirmation} icon="delete">
        Delete
      </AppDowndownItem>
      <Modal show={confirming} onHide={closeConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to delete "<strong>{script.title}</strong>". This cannot be
          undone!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmation}>
            Cancel
          </Button>
          <AppButton variant="danger" onClick={confirmScriptDelete} isLoading={deleting}>
            Delete
          </AppButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteButton
