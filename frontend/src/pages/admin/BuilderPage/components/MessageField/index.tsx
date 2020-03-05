import React, {
  useRef,
  RefObject,
  useEffect,
  useState,
  FocusEvent,
  useCallback
} from 'react'
import EmojiButton from './EmojiButton'
import { BaseEmoji } from 'emoji-mart'
import styled, { ThemeProvider } from 'styled-components'
import InputField from './InputField'
import themes from './themes'

const Wrapper = styled.div`
  border-radius: 15px;
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  ${props =>
    props.theme.borderColor
      ? 'border: 1px solid ' + props.theme.borderColor + ';'
      : 'padding: 1px;'};
  padding-left: ${props => (props.theme.borderColor ? 11 : 12)}px;
  display: inline-block;
`

type Props = {
  theme: 'bot' | 'response'
  value: string
  inputRef: RefObject<HTMLTextAreaElement | HTMLInputElement>
  className?: string
  onChange: (message: string) => void
  onSubmit?: () => void
  onBlur?: () => void
  autoFocus?: boolean
}

const MessageField: React.FunctionComponent<Props> = ({
  theme,
  value,
  className,
  inputRef,
  onChange,
  onSubmit,
  onBlur,
  autoFocus
}) => {
  const [isFocused, setFocus] = useState(false)
  const [lastSelectionStart, setSelectionStart] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const jumpSelelection = useRef<boolean>(false)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isFocused &&
        containerRef.current &&
        !containerRef.current.contains(event.target as any)
      ) {
        setFocus(false)
        onBlur!()
      }
    },
    [isFocused, onBlur]
  )

  useEffect(() => {
    onBlur && document.addEventListener('click', handleClickOutside)

    return () => onBlur && document.removeEventListener('click', handleClickOutside)
  }, [onBlur, handleClickOutside])

  const selectEmoji = (emoji: BaseEmoji) => {
    inputRef.current!.focus()
    if (lastSelectionStart === null) {
      onChange(value + emoji.native)
    } else {
      jumpSelelection.current = true
      onChange(
        [
          value.slice(0, lastSelectionStart),
          emoji.native,
          value.slice(lastSelectionStart)
        ].join('')
      )
    }
  }

  useEffect(() => {
    if (lastSelectionStart !== null && jumpSelelection.current) {
      jumpSelelection.current = false
      inputRef.current!.setSelectionRange(lastSelectionStart + 1, lastSelectionStart + 1)
    }
  }, [value, inputRef, lastSelectionStart])

  const onTextfieldBlur = (e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectionStart(e.target.selectionStart)
  }

  return (
    <ThemeProvider theme={theme === 'bot' ? themes.bot : themes.response}>
      <Wrapper ref={containerRef} className={className}>
        <InputField
          inputRef={inputRef}
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          onFocus={() => setFocus(true)}
          onBlur={onTextfieldBlur}
          autoFocus={autoFocus}
        />
        <EmojiButton container={containerRef} onSelect={selectEmoji} />
      </Wrapper>
    </ThemeProvider>
  )
}

export default MessageField
