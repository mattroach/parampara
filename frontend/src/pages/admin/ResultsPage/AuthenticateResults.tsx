import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { loadScriptResults } from 'store/slices/scriptResults'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

type Props = {
  scriptId: string
}

const StyledForm = styled(Form)`
  display: block;
  input {
    margin-right: 8px;
  }
`

const AuthenticateResults: React.FunctionComponent<Props> = ({ scriptId }) => {
  const [password, setPassword] = useState('')
  const updatePassword = (event: any) => setPassword(event.target.value)

  const dispatch = useDispatch()

  const submit = (e: any) => {
    e.preventDefault()
    dispatch(loadScriptResults(scriptId, password))
  }

  return (
    <StyledForm inline onSubmit={submit}>
      <p>Password is required to view results.</p>
      <Form.Control
        type="password"
        placeholder="Password"
        onChange={updatePassword}
        autoFocus
      />
      <Button type="submit">Submit</Button>
    </StyledForm>
  )
}

export default AuthenticateResults
