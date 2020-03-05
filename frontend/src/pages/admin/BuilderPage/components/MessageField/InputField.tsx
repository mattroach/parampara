import React, { RefObject, useContext, FocusEvent } from 'react'
import styled, { ThemeContext } from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import AutosizeInput from 'react-input-autosize'

const StyledTextareaAutosize = styled(TextareaAutosize).attrs(props => ({
  minRows: 1,
  placeholder: props.theme.placeholder
}))`
  display: inline-block;
  width: calc(100% - 40px);
  margin-top: 5px;
  border: none;
  background: transparent;
  resize: none;
  color: inherit;
  line-height: 1.3;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: inherit;
    opacity: 0.7;
  }
`

const ResponseEditField = styled(AutosizeInput).attrs(props => ({
  placeholder: props.theme.placeholder
}))`
  margin-top: 5px;
  input {
    color: #006bfa;
    border: none;
    padding: 0;
    min-width: 20px;

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
  inputRef: RefObject<HTMLTextAreaElement | HTMLInputElement>
  onChange: (message: string) => void
  onSubmit?: () => void
  onBlur?: (e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onFocus: () => void
  autoFocus?: boolean
}

const InputField: React.FunctionComponent<Props> = ({
  value,
  inputRef,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  autoFocus
}) => {
  const themeContext = useContext(ThemeContext)

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit && onSubmit()
    }
  }

  const inputOnChange = (event: any) => {
    onChange(event.target.value)
  }

  if (themeContext.inputType === 'textarea')
    return (
      <StyledTextareaAutosize
        inputRef={el => ((inputRef as any).current = el)}
        value={value}
        onChange={inputOnChange}
        onKeyPress={handleKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
    )
  else
    return (
      <ResponseEditField
        inputRef={el => ((inputRef as any).current = el)}
        value={value}
        onChange={inputOnChange}
        onKeyPress={handleKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
    )
}

export default InputField
