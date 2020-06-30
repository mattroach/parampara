import React, { useRef, useState } from 'react'
import GiphyPicker from './GiphyPicker'
import InlineIconButton from '../InlineIconButton'
import Popper from 'components/Popper'

type Props = {
  container: React.RefObject<HTMLDivElement>
  insertPosition?: number
  onAddItem?: () => void
}

const POPPER_CONFIG = [
  {
    name: 'flip',
    options: {
      fallbackPlacements: ['bottom', 'top']
    }
  },
  {
    name: 'preventOverflow',
    options: { rootBoundary: 'document' }
  }
]

const GiphyButton: React.FunctionComponent<Props> = ({
  container,
  insertPosition,
  onAddItem
}) => {
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
        iconSize={40}
        onClick={() => setShow(true)}
      />

      <Popper
        placement="bottom"
        target={targetRef}
        container={container}
        show={isShow}
        onBlur={hide}
        modifiers={POPPER_CONFIG}
      >
        <GiphyPicker onPick={onPick} insertPosition={insertPosition} />
      </Popper>
    </>
  )
}

export default GiphyButton
