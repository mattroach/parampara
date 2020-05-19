import React, { FocusEvent, useRef } from 'react'
import Button, { ButtonProps } from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import styled from 'styled-components'

const StyledUrlField = styled(Form.Control)`
  background-color: inherit !important;
`

type Props = {
  content: string
  variant?: ButtonProps['variant']
}

const CopyContentInput: React.FunctionComponent<Props> = ({ content, variant }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onFocus = (event: FocusEvent<HTMLInputElement>) => event.target.select()
  const onCopy = () => {
    inputRef.current!.focus()
    document.execCommand('copy')
  }

  return (
    <InputGroup>
      <StyledUrlField
        value={content}
        onFocus={onFocus}
        ref={inputRef as React.RefObject<any>}
        readOnly
      />
      <InputGroup.Append>
        <Button onClick={onCopy} variant={variant}>
          Copy to clipboard
        </Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

export default CopyContentInput
