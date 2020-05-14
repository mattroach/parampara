import Popper from 'components/Popper'
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector } from 'react-redux'
import ItemNavigationForm from './ItemNavigationForm'

type Props = {
  position: number
  currentValue: number | undefined
  targetRef: React.RefObject<any>
  disabled?: boolean
  onChangeNavigation: (nextId: number) => void
}

const ContextNavigate: React.FunctionComponent<Props> = ({
  disabled,
  currentValue,
  position,
  targetRef,
  onChangeNavigation
}) => {
  const [isShow, setShow] = useState(false)
  const hide = () => setShow(false)
  const show = () => setShow(true)

  // If not delayed, the menu seems to steal focus
  const showDelayed = () => {
    setTimeout(() => {
      show()
    }, 1)
  }

  const changeNavigation = (nextId: number) => {
    hide()
    onChangeNavigation(nextId)
  }

  const atLeastTwoItems = useSelector(
    state => state.scriptStore.script!.version.items.length > 1
  )
  const disabled_ = !atLeastTwoItems || disabled

  const modifiers = [
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['right-start', 'left-start']
      }
    },
    {
      name: 'preventOverflow',
      options: { rootBoundary: 'document' }
    }
  ]

  const stopKeyboardPropogation = (e: React.KeyboardEvent<HTMLElement>) => {
    // If this bubbles, the menu steals focus on up/down arrow keys.. not exactly sure why but this prevents that.
    e.stopPropagation()
  }

  return (
    <>
      <Popper target={targetRef} show={isShow} modifiers={modifiers}>
        <div onKeyDown={stopKeyboardPropogation}>
          <ItemNavigationForm
            onSelect={changeNavigation}
            currentValue={currentValue}
            position={position}
            onBlur={hide}
          />
        </div>
      </Popper>
      <Dropdown.Item as="button" disabled={disabled_} onClick={showDelayed}>
        Add navigation jump
      </Dropdown.Item>
    </>
  )
}

export default ContextNavigate
