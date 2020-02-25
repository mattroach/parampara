import React, { useState } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

type Props = {
  password: string
}

const CreateUser: React.FunctionComponent<Props> = ({ password }) => {
  const [email, setEmail] = useState('')
  const updateEmail = (event: any) => setEmail(event.target.value)
  const submit = (event: any) => {
    event.preventDefault()
    console.log(email)
    setEmail('')

    axios.post(`/api/superadmin/createUser`, { email }, { params: { password } })
      .then(() => {
        window.location.reload(false)
      })
  }

  return (
    <>
      <h4>Create a new user</h4>
      <Form onSubmit={submit}>
        <Form.Control placeholder="Email" onChange={updateEmail} />
        <Button variant="primary" type="submit" disabled={!email}>Submit</Button>
      </Form>
    </>
  )
}

export default CreateUser