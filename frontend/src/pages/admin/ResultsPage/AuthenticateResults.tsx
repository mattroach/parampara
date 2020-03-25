import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { loadScriptResults } from 'store/slices/scriptResults'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { AxiosError } from 'axios'
import { AppDispatch } from 'store/store'

type Props = {
  scriptId: string
}

const StyledForm = styled(Form)`
  display: block;
  input {
    margin-right: 8px;
  }
`

const ErrorMessage = styled.span`
  margin-left: 8px;
  color: red;
`

const AuthenticateResults: React.FunctionComponent<Props> = ({ scriptId }) => {
  const [password, setPassword] = useState('')

  const [hasErrors, setHasErrors] = useState(false)
  const updatePassword = (event: any) => setPassword(event.target.value)

  const dispatch: AppDispatch = useDispatch()

  const submit = (e: any) => {
    e.preventDefault()
    dispatch(loadScriptResults(scriptId, password)).catch((e: AxiosError) => {
      if (e.isAxiosError && e.response?.status === 401) {
        setHasErrors(true)
      }
    })
  }

  return (
    <StyledForm inline onSubmit={submit}>
      <p>Password is required to view results.</p>
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={updatePassword}
        autoFocus
      />
      <Button type="submit" disabled={!password}>
        Submit
      </Button>
      {hasErrors && <ErrorMessage>Incorrect password</ErrorMessage>}
    </StyledForm>
  )
}

export default AuthenticateResults
