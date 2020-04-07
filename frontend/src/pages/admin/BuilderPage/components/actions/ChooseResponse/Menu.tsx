import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { removeResponseChoice, updateResponseNextId } from 'store/slices/script'
import { ResponseChoice } from 'types/scriptTypes'
import ContextMenu, { ContextNavigate } from '../../ContextMenu'

type Props = {
  response: ResponseChoice
  containerRef: React.RefObject<any>
  position: number
  responsePosition: number
}

const Menu: React.FunctionComponent<Props> = ({
  response,
  position,
  responsePosition,
  containerRef
}) => {
  const dispatch = useDispatch()

  const changeNavigation = (nextId: number) =>
    dispatch(updateResponseNextId({ position, responsePosition, nextId }))
  const deleteItem = () => dispatch(removeResponseChoice({ position, responsePosition }))

  return (
    <ContextMenu htmlId={position}>
      <ContextNavigate
        position={position}
        targetRef={containerRef}
        onChangeNavigation={changeNavigation}
        currentValue={response.nextId}
      />
      <Dropdown.Divider />
      <Dropdown.Item as="button" onClick={deleteItem}>
        Delete
      </Dropdown.Item>
    </ContextMenu>
  )
}

export default Menu
