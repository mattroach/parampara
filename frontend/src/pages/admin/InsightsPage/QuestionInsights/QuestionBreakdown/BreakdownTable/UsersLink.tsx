import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import UsersModal from './UsersModal'

type Props = {
  question: string
  answer: string
  number: number
}

const UsersLink: React.FunctionComponent<Props> = ({ question, answer, number }) => {
  const hasEmails = !useSelector(
    (state: RootState) => state.scriptStore.script!.allowAnon
  )
  const [showModal, setShowModal] = useState(false)

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  const content = `${number} user${number > 1 ? 's' : ''}`
  if (!hasEmails) return <>{content}</>

  return (
    <>
      <a href="#open" onClick={openModal}>
        {content}
      </a>
      <UsersModal
        question={question}
        answer={answer}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}

export default UsersLink
