import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { AppDispatch } from 'store/store'
import { login } from 'store/slices/authentication'
import Col from 'react-bootstrap/Col'

const StyledForm = styled(Form)`
  margin: 40px auto;
  width: 300px;

  h6 {
    text-align: center;
  }
`

const Authentication: React.FunctionComponent = () => {
  const [password, setPassword] = useState('')

  const [hasErrors, setHasErrors] = useState(false)
  const updatePassword = (event: any) => setPassword(event.target.value)

  const dispatch: AppDispatch = useDispatch()

  const submit = async (e: any) => {
    e.preventDefault()
    const success = await dispatch(login(password))
    if (!success) setHasErrors(true)
  }

  return (
    <StyledForm onSubmit={submit}>
      <h6>Password is required to view results.</h6>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            isInvalid={hasErrors}
            autoFocus
          />
          <Form.Control.Feedback type="invalid">Incorrect password</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs="auto">
          <Button type="submit" disabled={!password}>
            Submit
          </Button>
        </Form.Group>
      </Form.Row>
    </StyledForm>
  )
}

export default Authentication
