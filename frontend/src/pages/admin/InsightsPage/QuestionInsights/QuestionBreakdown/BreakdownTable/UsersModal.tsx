import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { loadScriptQuestionInsightUsers } from 'store/slices/scriptInsights'
import { AppDispatch } from 'store/store'

type Props = {
  question: string
  answer: string
  show: boolean
  onClose: () => void
}

const UsersModal: React.FunctionComponent<Props> = ({
  question,
  answer,
  show,
  onClose
}) => {
  const dispatch: AppDispatch = useDispatch()

  const [users, setUsers] = useState<string[] | undefined>(undefined)

  useEffect(() => {
    if (show) {
      dispatch(loadScriptQuestionInsightUsers(question, answer)).then(setUsers)
    }
  }, [dispatch, show, question, answer])

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{answer}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {users && (
          <ul>
            {users.map(user => (
              <li key={user}>
                <a href={`mailto:${user}`}>{user}</a>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose} autoFocus>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default UsersModal
