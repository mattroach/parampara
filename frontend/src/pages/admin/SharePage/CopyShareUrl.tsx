import React, { FocusEvent, useRef } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { appPaths } from 'App'

const CopyShareUrl: React.FunctionComponent<{ className?: string }> = ({ className }) => {
  const scriptId = useSelector((state: RootState) => state.scriptStore.script!.id)
  const inputRef = useRef<HTMLInputElement>(null)

  const url = appPaths.baseUrl() + appPaths.playScript(scriptId)

  const onFocus = (event: FocusEvent<HTMLInputElement>) => event.target.select()
  const onCopy = () => {
    inputRef.current!.focus()
    document.execCommand("copy")
  }

  return (
    <InputGroup className={className}>
      <Form.Control value={url} onFocus={onFocus} ref={inputRef as React.RefObject<any>} readOnly />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={onCopy} >Copy to clipboard</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

export default CopyShareUrl