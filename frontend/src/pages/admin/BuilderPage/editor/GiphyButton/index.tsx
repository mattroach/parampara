import React, { useRef, useState } from 'react'
import GiphyPicker from './GiphyPicker'
import InlineIconButton from '../InlineIconButton'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'


const GiphyButton: React.FunctionComponent = () => {
  const [show, setShow] = useState(false)
  const targetRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <InlineIconButton
        ref={targetRef}
        disableTooltip={show}
        tooltip="Choose a gif"
        icon="gif"
        onClick={() => setShow(true)}
      />

      <Overlay
        show={show}
        target={targetRef.current!}
        placement="top"
        onHide={() => setShow(false)}
        rootClose={true}
      >
        <Popover id="popover-giphy">
          <GiphyPicker />
        </Popover>
      </Overlay>
    </>
  )
}

export default GiphyButton