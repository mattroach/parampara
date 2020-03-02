import React, { useRef } from 'react'
import InlineIconButton from './InlineIconButton'

type Props = {
  color?: string
}
const MessageSubmitButton: React.FunctionComponent<Props> = ({ color }) => {
  // Shouldn't need this but currently required for InlineIconButton to work
  const targetRef = useRef<HTMLInputElement>(null)

  return (
    <InlineIconButton
      ref={targetRef}
      color={color}
      type="submit"
      tooltip="Press Enter to submit"
      icon="send"
    />
  )
}

export default MessageSubmitButton
