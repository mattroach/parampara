import React, { useEffect } from 'react'
import api from 'api'
import { useHistory } from 'react-router-dom'

type Props = { email: string }

const CreateAccount: React.FunctionComponent<Props> = ({ email }) => {
  const history = useHistory()

  useEffect(() => {
    api.createAccount(email).then(userId => {
      history.push(`/u/${userId}`)
    })
  }, [email, history])
  return null
}

export default CreateAccount
