import { EmojiData, BaseEmoji } from 'emoji-mart'
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

  const [isShow, setShow] = useState(false)
  const hide = () => setShow(false)

  const pickEmoji = (emoji: EmojiData) => {
    hide()
    onSelect && onSelect(emoji as BaseEmoji)
  }

  return (
    <>
      <Button ref={targetRef} disableTooltip={isShow} onClick={() => setShow(true)} />
      <Overlay
        show={isShow}
        target={targetRef.current!}
        container={container.current!}
        placement="top"
        onHide={hide}
        rootClose={true}
        //transition={false}
      >
        <Popover id="popover-emoji">
          <EmojiPicker onSelect={pickEmoji} />
        </Popover>
      </Overlay>
    </>
  )
}

export default EmojiButton
