import React, { useRef } from 'react'
import styled from 'styled-components'
import ElasticField from './ElasticField'
import EmojiButton from '../../../MessageField/EmojiButton'
import themes from '../../../MessageField/themes'
import { BaseEmoji } from 'emoji-mart'
import { useContainerFocus } from 'hooks/useContainerFocus'

export const ActionBubble = styled.div`
  padding: 5px 13px;
  border-radius: 15px;
  border: 1px solid #006bfa;
  color: #006bfa;
  box-shadow: rgb(217, 217, 217) 0px 2px 6px;

  transition: box-shadow 0.15s ease-in-out;
  :focus-within {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export const StyledEmojiButton = styled(EmojiButton).attrs({ theme: themes.response })`
  margin: -6px -14px 0 0;
  float: right;
  @keyframes slideIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: 1s ease 0s 0.2 slideIn;
`

export const Wrapper = styled.div`
  display: inline-block;
  margin: 0 0 4px 4px;
`

type Props = {
  value: string
  setValue: (v: string) => void
  onSubmit: (v: string) => void
  onClear: () => void
  renderMenu?: (wrapperRef: React.RefObject<HTMLDivElement>) => React.ReactNode
  renderBefore?: () => React.ReactNode
  renderNavId?: () => React.ReactNode
  autoFocus?: boolean
  className?: string
  placeholder?: string
}

const ResponseOption: React.FunctionComponent<Props> = ({
  onSubmit,
  onClear,
  renderMenu,
  renderBefore,
  renderNavId,
  value,
  setValue,
  autoFocus,
  placeholder,
  className
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useContainerFocus(wrapperRef)

  const selectEmoji = (emoji: BaseEmoji) => {
    inputRef.current!.focus()
    setValue(value + emoji.native)
  }

  const submit = () => {
    if (value) onSubmit(value)
    else onClear()
  }

  return (
    <Wrapper ref={wrapperRef} className={className}>
      {renderMenu && renderMenu(wrapperRef)}
      <ActionBubble className="bubble">
        {renderBefore && renderBefore()}
        <ElasticField
          inputRef={inputRef}
          value={value}
          setValue={setValue}
          onSubmit={submit}
          onBlur={submit}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {focused && <StyledEmojiButton container={wrapperRef} onSelect={selectEmoji} />}
        {renderNavId && renderNavId()}
      </ActionBubble>
    </Wrapper>
  )
}

export const DraftResponseOption = styled(ResponseOption)`
  > .bubble {
    border: 1px solid rgba(0, 107, 250, 0.6);

    :not(:focus-within) {
      box-shadow: none;
    }
    :focus-within {
      border: 1px solid #006bfa;
    }
  }

  input[type='text'] {
    min-width: 44px;
  }
`

export default ResponseOption
