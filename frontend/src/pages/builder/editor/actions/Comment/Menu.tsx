import React from 'react'
import ItemMenu from '../../items/components/ItemMenu'
import DeleteItem from './DeleteItem'

type Props = {
  position: number
}

const Menu: React.FunctionComponent<Props> = ({ position }) => {
  return (
    <ItemMenu id={position}>
      <DeleteItem position={position} />
    </ItemMenu>
  )
}

export default Menu