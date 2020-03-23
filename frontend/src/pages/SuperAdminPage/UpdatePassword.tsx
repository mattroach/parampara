import React, { useState } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

type Props = {
  password: string
}

const UpdatePassword: React.FunctionComponent<Props> = ({ password }) => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const updateEmail = (event: any) => setEmail(event.target.value)
  const updatePassword = (event: any) => setNewPassword(event.target.value)

  const submit = (event: any) => {
    event.preventDefault()
    setEmail('')
    setNewPassword('')

    axios
      .post(
        `/api/superadmin/updatePassword`,
        { email, newPassword },
        { params: { password } }
      )
      .then(() => {
        window.location.reload(false)
      })
      .catch(error => {
        alert(error.response.data.error)
      })
  }

  return (
    <>
      <h4>Update a user's password</h4>
      <Form onSubmit={submit}>
        <Form.Control placeholder="Email" onChange={updateEmail} />
        <Form.Control placeholder="New password" onChange={updatePassword} />
        <Button variant="primary" type="submit" disabled={!email || !newPassword}>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default UpdatePassword
