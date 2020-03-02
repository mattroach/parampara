import React, { useRef, useState } from 'react'
import GiphyPicker from './GiphyPicker'
import InlineIconButton from '../InlineIconButton'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'

type Props = {
  container: React.RefObject<HTMLDivElement>
  insertPosition?: number
  onAddItem?: () => void
}

const GiphyButton: React.FunctionComponent<Props> = ({
  container,
  insertPosition,
  onAddItem
}) => {
  const [isShow, setShow] = useState(false)
  const targetRef = useRef<HTMLInputElement>(null)
  const focusRef = useRef<HTMLInputElement>(null)

  const hide = () => setShow(false)
  const onPick = () => {
    onAddItem && onAddItem()
    hide()
  }

  const focusGiphyPicker = () => {
    // We must focus this way instead of via autoFocus, as autoFocus causes the scroll to jump to the very top
    // (probably because the element is not rendered in the absolute position yet)
    focusRef.current!.focus()
  }

  return (
    <>
      <InlineIconButton
        ref={targetRef}
        disableTooltip={isShow}
        tooltip="Choose a gif"
        icon="gif"
        iconSize={40}
        onClick={() => setShow(true)}
      />

      <Overlay
        show={isShow}
        target={targetRef.current!}
        container={container.current!}
        onEntered={focusGiphyPicker}
        placement="top"
        onHide={hide}
        rootClose={true}
      >
        <Popover id="popover-giphy">
          <GiphyPicker
            onPick={onPick}
            insertPosition={insertPosition}
            focusRef={focusRef}
          />
        </Popover>
      </Overlay>
    </>
  )
}

export default GiphyButton
