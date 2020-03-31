import Popper from 'components/Popper'
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
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
    (state: RootState) => state.scriptStore.script!.version.items.length > 1
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

  return (
    <>
      <Popper target={targetRef} show={isShow} modifiers={modifiers}>
        <ItemNavigationForm
          onSelect={changeNavigation}
          currentValue={currentValue}
          position={position}
          onBlur={hide}
        />
      </Popper>
      <Dropdown.Item as="button" disabled={disabled_} onClick={showDelayed}>
        Add navigation jump
      </Dropdown.Item>
    </>
  )
}

export default ContextNavigate
