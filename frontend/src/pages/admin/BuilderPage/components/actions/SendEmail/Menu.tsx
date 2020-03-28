import React from 'react'
import ContextMenu from '../../ContextMenu'
import DeleteItem from '../DeleteItem'
import EditItem from './EditItem'
import { SendEmailAction } from 'types/scriptTypes'

type Props = {
  action: SendEmailAction
  position: number
}

const Menu: React.FunctionComponent<Props> = ({ action, position }) => {
  return (
    <ContextMenu id={position}>
      <EditItem action={action} position={position} />
      <DeleteItem position={position} />
    </ContextMenu>
  )
}

export default Menu
