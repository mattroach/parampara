import React from 'react'
import ItemMenu from '../components/ItemMenu'
import ItemMenuDelete from '../components/ItemMenuDelete'

type Props = {
  position: number
}

const Menu: React.FunctionComponent<Props> = ({ position }) => {
  return (
    <ItemMenu id={position}>
      <ItemMenuDelete position={position} />
    </ItemMenu>
  )
}

export default Menu