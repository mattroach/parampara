import React from 'react'
import TextInput from './TextInput'

type Props = {
  onSubmit: (content: string) => void
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const EmailInput: React.FunctionComponent<Props> = ({ onSubmit }) => {
  const isValid = (content: string) => {
    return validateEmail(content)
  }
  return (
    <TextInput
      onSubmit={onSubmit}
      placeholder="Type email..."
      isValid={isValid}
      invalidMessage="Invalid email"
    />
  )
}

export default EmailInput
