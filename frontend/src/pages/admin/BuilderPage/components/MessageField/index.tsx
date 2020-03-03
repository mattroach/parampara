import React, { useRef, useState, RefObject } from 'react'
import { Wrapper, InputField } from './index.styles'
import EmojiButton from './EmojiButton'
import { BaseEmoji } from 'emoji-mart'

type Props = {
  value: string
  inputRef: RefObject<HTMLTextAreaElement>
  className?: string
  onChange: (message: string) => void
  onSubmit?: () => void
  onBlur?: () => void
  autoFocus?: boolean
}

const MessageField: React.FunctionComponent<Props> = ({
  value,
  className,
  inputRef,
  onChange,
  onSubmit,
  onBlur,
  autoFocus
}) => {
  const containerRef = useRef<HTMLInputElement>(null)

  const selectEmoji = (emoji: BaseEmoji) => {
    onChange(value + emoji.native)
    inputRef?.current!.focus()
  }
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
    <Wrapper ref={containerRef} className={className}>
      <InputField
        ref={inputRef}
        value={value}
        onChange={inputOnChange}
        onBlur={onBlur}
        onKeyPress={handleKeyPress}
        autoFocus={autoFocus}
      />
      <EmojiButton container={containerRef} onSelect={selectEmoji} />
    </Wrapper>
  )
}

export default MessageField
