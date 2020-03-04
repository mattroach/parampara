import React, { useRef, RefObject, useEffect, useState } from 'react'
import EmojiButton from './EmojiButton'
import { BaseEmoji } from 'emoji-mart'
import styled from 'styled-components'
import InputField from './InputField'

const Wrapper = styled.div`
  border-radius: 15px;
  background: rgb(239, 239, 239);
  padding: 0 0 0 11px;
  display: inline-block;
`

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
  const [isFocused, setFocus] = useState(autoFocus)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isFocused &&
      containerRef.current &&
      !containerRef.current.contains(event.target as any)
    ) {
      console.log('call blur')
      setFocus(false)
      onBlur!()
    }
  }

  useEffect(() => {
    onBlur && document.addEventListener('click', handleClickOutside)

    return () => onBlur && document.removeEventListener('click', handleClickOutside)
  }, [onBlur, isFocused])

  const selectEmoji = (emoji: BaseEmoji) => {
    onChange(value + emoji.native)
    inputRef?.current!.focus()
  }

  return (
    <Wrapper ref={containerRef} className={className}>
      <InputField
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onFocus={() => setFocus(true)}
        autoFocus={autoFocus}
      />
      <EmojiButton container={containerRef} onSelect={selectEmoji} />
    </Wrapper>
  )
}

export default MessageField
