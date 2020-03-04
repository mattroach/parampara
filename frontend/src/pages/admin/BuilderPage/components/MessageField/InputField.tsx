import React, { RefObject } from 'react'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

const StyledTextareaAutosize = styled(TextareaAutosize).attrs(props => ({
  minRows: 1,
  placeholder: 'Add a message...'
}))`
  display: inline-block;
  width: calc(100% - 40px);
  margin-top: 6px;
  border: none;
  background: transparent;
  resize: none;
  color: rgb(51, 51, 51);
  line-height: 1.3;

  :focus {
    outline: none;
  }
`

type Props = {
  value: string
  inputRef: RefObject<HTMLTextAreaElement>
  onChange: (message: string) => void
  onSubmit?: () => void
  onFocus: () => void
  autoFocus?: boolean
}

const InputField: React.FunctionComponent<Props> = ({
  value,
  inputRef,
  onChange,
  onSubmit,
  onFocus,
  autoFocus
}) => {
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit && onSubmit()
    }
  }

  const inputOnChange = (event: any) => {
    onChange(event.target.value)
  }

  return (
    <StyledTextareaAutosize
      inputRef={el => ((inputRef as any).current = el)}
      value={value}
      onChange={inputOnChange}
      onKeyPress={handleKeyPress}
      onFocus={onFocus}
      autoFocus={autoFocus}
    />
  )
}

export default InputField
