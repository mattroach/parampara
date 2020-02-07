import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { removeItem } from 'store/slices/script'
import ItemMenu from '../components/ItemMenu'

type Props = {
  position: number
}

const Menu: React.FunctionComponent<Props> = ({ position }) => {
  const dispatch = useDispatch()

  const deleteItem = () => dispatch(removeItem(position))

  return (
    <ItemMenu id={position}>
      <Dropdown.Item as="button" onClick={deleteItem}>Delete</Dropdown.Item>
    </ItemMenu>
  )
}

export default Menu