import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AppButton from 'components/AppButton'
import { deleteSelected } from 'store/slices/scriptResults'
import { AppDispatch } from 'store/store'

const NumSelected = styled.small.attrs({
  className: 'text-muted'
})`
  margin-left: 10px;
`

const DeleteAction: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()

  const numSelected = useSelector(
    (state: RootState) => Object.keys(state.scriptResultsStore.selected).length
  )

  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const onConfirm = async () => {
    setDeleting(true)
    await dispatch(deleteSelected())
    setDeleting(false)
    setConfirming(false)
  }

  if (numSelected === 0) return null

  return (
    <>
      <Button variant="danger" onClick={() => setConfirming(true)}>
        Delete
      </Button>
      <NumSelected>{numSelected} selected</NumSelected>
      <ConfirmationModal
        show={confirming}
        numDeletions={numSelected}
        closeConfirmation={() => setConfirming(false)}
        onConfirm={onConfirm}
        processing={deleting}
      />
    </>
  )
}

type ModalProps = {
  show: boolean
  numDeletions: number
  closeConfirmation: () => void
  onConfirm: () => void
  processing: boolean
}
const ConfirmationModal = ({
  show,
  closeConfirmation,
  onConfirm,
  numDeletions,
  processing
}: ModalProps) => (
  <Modal show={show} onHide={closeConfirmation}>
    <Modal.Header closeButton>
      <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      You are about to delete {numDeletions} response(s). This cannot be undone!
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeConfirmation}>
        Cancel
      </Button>
      <AppButton variant="danger" onClick={onConfirm} isLoading={processing}>
        Delete
      </AppButton>
    </Modal.Footer>
  </Modal>
)

export default DeleteAction
