import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { removeResponseChoice } from 'store/slices/script'
import ItemMenu from '../components/ItemMenu'

type Props = {
  position: number
  responsePosition: number
}

const Menu: React.FunctionComponent<Props> = ({ position, responsePosition }) => {
  const dispatch = useDispatch()

  const deleteItem = () => dispatch(removeResponseChoice(position, responsePosition))

  return (
    <ItemMenu id={position}>
      <Dropdown.Item as="button" onClick={deleteItem}>Delete</Dropdown.Item>
    </ItemMenu>
  )
}

export default Menu