import React, { useRef, useState } from 'react'
import GiphyPicker from './GiphyPicker'
import InlineIconButton from '../InlineIconButton'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'


const GiphyButton: React.FunctionComponent = () => {
  const [isShow, setShow] = useState(false)
  const targetRef = useRef<HTMLInputElement>(null)

  const hide = () => setShow(false)

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
        placement="top"
        onHide={hide}
        rootClose={true}
      >
        <Popover id="popover-giphy">
          <GiphyPicker onPick={hide} />
        </Popover>
      </Overlay>
    </>
  )
}

export default GiphyButton