import React, { useState, useContext } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AuthContext from 'superadmin/AuthContext'

const CreateUser: React.FunctionComponent = () => {
  const password = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const updateEmail = (event: any) => setEmail(event.target.value)
  const submit = (event: any) => {
    event.preventDefault()
    setEmail('')

    axios
      .post(`/api/superadmin/createUser`, { email }, { params: { password } })
      .then(() => {
        window.location.reload(false)
      })
  }

  return (
    <>
      <h4>Create a new user</h4>
      <Form onSubmit={submit} inline>
        <Form.Control placeholder="Email" onChange={updateEmail} />
        <Button variant="primary" type="submit" disabled={!email}>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default CreateUser
