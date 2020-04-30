import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'
import ItemWrap from '../item-types/ItemWrap'
import Col from 'react-bootstrap/Col'

const Wrapper = styled(ItemWrap).attrs({
  unlimitedWidth: true
})`
  margin: 20px 0;
  text-align: right;
`

const GoButton = styled(Button)`
  border-radius: 100%;
  font-size: 12px;

  width: 30px;
  height: 30px;
  padding: 0;
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
    containerRef.current!.scrollIntoView({ behavior: 'smooth' })
  }

  const isInvalid = () => isValid && !isValid(content)

  return (
    <Wrapper ref={containerRef as any}>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <MessageInput
              placeholder={placeholder}
              onChange={updateContent}
              isInvalid={isInvalid() && content !== ''}
              autocomplete="off"
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {invalidMessage || 'Invalid input'}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="submit">
            <GoButton variant="primary" type="submit" disabled={isInvalid()}>
              Go
            </GoButton>
          </Form.Group>
        </Form.Row>
      </Form>
    </Wrapper>
  )
}

export default TextInput
