import React, { useState, useContext } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AuthContext from 'superadmin/AuthContext'

const UpdatePassword: React.FunctionComponent = () => {
  const password = useContext(AuthContext)
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
      <Form onSubmit={submit} inline>
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
