import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { removeResponseChoice } from 'store/slices/script'
import ContextMenu from '../../ContextMenu'

type Props = {
  position: number
  responsePosition: number
}

const Menu: React.FunctionComponent<Props> = ({ position, responsePosition }) => {
  const dispatch = useDispatch()

  const deleteItem = () => dispatch(removeResponseChoice(position, responsePosition))

  return (
    <ContextMenu id={position}>
      <Dropdown.Item as="button" onClick={deleteItem}>Delete</Dropdown.Item>
    </ContextMenu>
  )
}

export default Menu