import React from 'react'
import ContextMenu from '../../ContextMenu'
import DeleteItem from './DeleteItem'

type Props = {
  position: number
}

const Menu: React.FunctionComponent<Props> = ({ position }) => {
  return (
    <ContextMenu id={position}>
      <DeleteItem position={position} />
    </ContextMenu>
  )
}

export default Menu