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

const GiphyButton: React.FunctionComponent<Props> = ({ container, insertPosition, onAddItem }) => {
  const [isShow, setShow] = useState(false)
  const targetRef = useRef<HTMLInputElement>(null)

  const hide = () => setShow(false)
  const onPick = () => {
    onAddItem && onAddItem()
    hide()
  }

  return (
    <>
      <InlineIconButton
        ref={targetRef}
        disableTooltip={isShow}
        tooltip="Choose a gif"
        icon="gif"
        onClick={() => setShow(true)}
      />

      <Overlay
        show={isShow}
        target={targetRef.current!}
        container={container.current!}
        placement="top"
        onHide={hide}
        rootClose={true}
      >
        <Popover id="popover-giphy">
          <GiphyPicker onPick={onPick} insertPosition={insertPosition} />
        </Popover>
      </Overlay>
    </>
  )
}

export default GiphyButton