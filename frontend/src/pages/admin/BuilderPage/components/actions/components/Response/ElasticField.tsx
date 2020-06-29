import React, { useRef } from 'react'
import styled from 'styled-components'
import AutosizeInput from 'react-input-autosize'
import Form from 'react-bootstrap/Form'
import { useDeferredAutoFocus } from 'hooks/useDeferredAutoFocus'

const InlineForm = styled(Form)`
  display: inline;
`

export const Field = styled(AutosizeInput)`
  input {
    color: #006bfa;
    display: inline-block;
    border: none;
    padding: 0;
    height: auto;
    outline: none;

    :focus {
      color: #006bfa;
      outline: none;
      box-shadow: none;
    }
    ::placeholder {
      color: #006bfa;
      opacity: 0.6;
    }
  }
`

type Props = {
  value?: string
  setValue: (v: string) => void
  onSubmit: (v: string) => void
  onClear: () => void
  autoFocus?: boolean
}

const ElasticField: React.FunctionComponent<Props> = ({
  value,
  setValue,
  onSubmit,
  onClear,
  autoFocus
}) => {
  const inputRef = useRef<HTMLInputElement>()

  useDeferredAutoFocus(inputRef, autoFocus)

  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  const submit = (event: any) => {
    event.preventDefault()
    submitChange()
  }

  const submitChange = () => {
    if (value) {
      onSubmit(value)
    } else {
      onClear()
    }
  }

  return (
    <InlineForm onSubmit={submit}>
      <Field
        inputRef={ref => (inputRef.current = ref || undefined)}
        type="text"
        placeholder="Add..."
        value={value || ''}
        onChange={onChange}
        onBlur={submitChange}
      />
    </InlineForm>
  )
}

export default ElasticField
