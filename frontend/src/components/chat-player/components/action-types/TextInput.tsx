import React, { useRef, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'
import ItemWrap from '../item-types/ItemWrap'
import GoButton from './GoButton'

const Wrapper = styled(ItemWrap).attrs({
  unlimitedWidth: true
})`
  margin: 20px 0;
  text-align: right;
`

const MessageInput = styled(Form.Control)`
  border: none;
  border-bottom: 1px solid #888;
  border-radius: 0;
  width: 200px;

  :focus {
    box-shadow: none !important;
  }
`

type Props = {
  placeholder: string
  onSubmit: (content: string) => void
  isValid?: (content: string) => boolean
  invalidMessage?: string
}

const TextInput: React.FunctionComponent<Props> = ({
  placeholder,
  onSubmit,
  isValid,
  invalidMessage
}) => {
  const [content, setContent] = useState('')
  const containerRef = useRef<HTMLDivElement>()
  const updateContent = (event: any) => {
    setContent(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    onSubmit(content)
    document.documentElement.scrollTo({
      top: containerRef.current!.offsetTop,
      behavior: 'smooth'
    })
  }

  const isInvalid = () => isValid && !isValid(content)

  return (
    <Wrapper ref={containerRef as any}>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="email" xs="auto">
            <MessageInput
              placeholder={placeholder}
              onChange={updateContent}
              isInvalid={isInvalid() && content !== ''}
              autoComplete="off"
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {invalidMessage || 'Invalid input'}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="submit" xs="auto">
            <GoButton disabled={isInvalid()} />
          </Form.Group>
        </Form.Row>
      </Form>
    </Wrapper>
  )
}

export default TextInput
