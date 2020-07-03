import { BaseEmoji, EmojiData } from 'emoji-mart'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import InlineIconButton from '../InlineIconButton'
import EmojiPicker from './EmojiPicker'
import Popper from 'components/Popper'

const Button = styled(InlineIconButton).attrs(props => ({
  icon: 'emoji_emotions',
  tooltip: 'Choose an emoji',
  size: 28,
  color: props.theme.emojiColor
}))`
  border-radius: 30px;
`

type Props = {
  container: React.RefObject<HTMLDivElement>
  onSelect: (emoji: BaseEmoji) => void
  show?: boolean
  className?: string
  theme?: any
}

const POPPER_CONFIG = [
  {
    name: 'flip',
    options: {
      fallbackPlacements: ['top', 'bottom']
    }
  },
  {
    name: 'preventOverflow',
    options: { rootBoundary: 'document' }
  }
]

const EmojiButton: React.FunctionComponent<Props> = ({
  container,
  onSelect,
  show,
  className,
  theme
}) => {
  // Shouldn't need this but currently required for InlineIconButton to work
  const targetRef = useRef<HTMLInputElement>(null)

  const [isShow, setShow] = useState(false)
  const hide = () => setShow(false)

  const pickEmoji = (emoji: EmojiData) => {
    onSelect(emoji as BaseEmoji)

    // This is a bit of the hack. It prevents the popper from hiding before the parent element does its test
    // to check if the click was within the current context or outside of it.
    setTimeout(hide, 0)
  }

  return (
    <>
      <Button
        ref={targetRef}
        disableTooltip={isShow}
        onClick={() => setShow(true)}
        className={className}
        theme={theme}
      />
      <Popper
        target={targetRef}
        show={isShow}
        modifiers={POPPER_CONFIG}
        container={container}
        onBlur={hide}
      >
        <EmojiPicker onSelect={pickEmoji} />
      </Popper>
    </>
  )
}

export default EmojiButton
