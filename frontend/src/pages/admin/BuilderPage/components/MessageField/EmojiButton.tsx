import { BaseEmoji, EmojiData } from 'emoji-mart'
import React, { useRef, useState } from 'react'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import styled from 'styled-components'
import InlineIconButton from '../InlineIconButton'
import EmojiPicker from './EmojiPicker'

const Button = styled(InlineIconButton).attrs(props => ({
  icon: 'emoji_emotions',
  tooltip: 'Choose an emoji',
  size: 28
}))`
  border-radius: 30px;
`

type Props = {
  container: React.RefObject<HTMLDivElement>
  onSelect?: (emoji: BaseEmoji) => void
}

const EmojiButton: React.FunctionComponent<Props> = ({ container, onSelect }) => {
  // Shouldn't need this but currently required for InlineIconButton to work
  const targetRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  const [isShow, setShow] = useState(false)
  const hide = () => setShow(false)

  const pickEmoji = (emoji: EmojiData) => {
    hide()
    onSelect && onSelect(emoji as BaseEmoji)
  }

  const focusPicker = () => {
    // This is hacky but neccessary because the picker library does not export any refs.
    pickerRef.current!.getElementsByTagName('input')[0].focus()
  }

  return (
    <>
      <Button ref={targetRef} disableTooltip={isShow} onClick={() => setShow(true)} />
      <Overlay
        show={isShow}
        target={targetRef.current!}
        container={container.current!}
        onEntered={focusPicker}
        placement="top"
        onHide={hide}
        rootClose={true}
      >
        <Popover id="popover-emoji">
          <div ref={pickerRef}>
            <EmojiPicker onSelect={pickEmoji} />
          </div>
        </Popover>
      </Overlay>
    </>
  )
}

export default EmojiButton
