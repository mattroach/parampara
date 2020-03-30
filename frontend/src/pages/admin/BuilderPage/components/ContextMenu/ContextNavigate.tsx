import React, { useState, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Overlay from 'react-bootstrap/Overlay'
import { RootState } from 'store/rootReducer'
import { useSelector } from 'react-redux'
import ItemNavigationForm from './ItemNavigationForm'

type Props = {
  position: number
  currentValue: number | undefined
  targetRef: React.RefObject<any>
  disabled?: boolean
  onChangeNavigation: (nextId: number) => void
  placement?: 'auto'
}

const ContextNavigate: React.FunctionComponent<Props> = ({
  disabled,
  currentValue,
  position,
  targetRef,
  onChangeNavigation,
  placement
}) => {
  const focusRef = useRef<any>(null)
  const [isShow, setShow] = useState(false)
  const hide = () => setShow(false)
  const show = () => setShow(true)

  const changeNavigation = (nextId: number) => {
    hide()
    onChangeNavigation(nextId)
  }

  const focusGiphyPicker = () => {
    // We must focus this way instead of via autoFocus, as autoFocus causes the scroll to jump to the very top
    // (probably because the element is not rendered in the absolute position yet)
    focusRef.current!.focus()
  }
  const atLeastTwoItems = useSelector(
    (state: RootState) => state.scriptStore.script!.version.items.length > 1
  )
  const disabled_ = !atLeastTwoItems || disabled

  const popperConfig = {
    modifiers: {
      preventOverflow: { enabled: true },
      flip: { enabled: true }
    }
  }

  return (
    <>
      <Overlay
        show={isShow}
        target={targetRef.current}
        onEntered={focusGiphyPicker}
        placement="right" //{placement || 'right'}
        popperConfig={popperConfig}
        rootClose={true}
        onHide={hide}
      >
        {({
          placement,
          scheduleUpdate,
          arrowProps,
          outOfBoundaries,
          show,
          popper,
          ...props
        }) => (
          <div {...props}>
            <div style={{ margin: 4 }}>
              <ItemNavigationForm
                focusRef={focusRef}
                onSelect={changeNavigation}
                currentValue={currentValue}
                position={position}
              />
            </div>
          </div>
        )}
      </Overlay>
      <Dropdown.Item as="button" disabled={disabled_} onClick={show}>
        Add navigation jump
      </Dropdown.Item>
    </>
  )
}

export default ContextNavigate
