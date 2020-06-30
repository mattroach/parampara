import React, { RefObject, MutableRefObject } from 'react'
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
  value: string
  setValue: (v: string) => void
  onSubmit: (v: string) => void
  onBlur?: () => void
  onFocus?: () => void
  autoFocus?: boolean
  inputRef: RefObject<HTMLInputElement>
  placeholder?: string
}

const ElasticField: React.FunctionComponent<Props> = ({
  value,
  setValue,
  onSubmit,
  onBlur,
  onFocus,
  autoFocus,
  inputRef,
  placeholder
}) => {
  useDeferredAutoFocus(inputRef, autoFocus)

  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  const submit = (event: any) => {
    event.preventDefault()
    onSubmit(value)
  }

  return (
    <InlineForm onSubmit={submit}>
      <Field
        inputRef={ref =>
          ((inputRef as MutableRefObject<HTMLInputElement | null>).current = ref)
        }
        type="text"
        placeholder={placeholder || 'Add...'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </InlineForm>
  )
}

export default ElasticField
