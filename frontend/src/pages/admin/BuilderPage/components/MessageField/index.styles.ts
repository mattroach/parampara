import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

export const Wrapper = styled.div`
  border-radius: 15px;
  background: rgb(239, 239, 239);
  padding: 0 0 0 10px;
  display: inline-block;
`

export const InputField = styled(TextareaAutosize).attrs(props => ({
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

  :focus {
    outline: none;
  }
`
