import React from 'react'
import DeleteItem from '../DeleteItem'
import EditItem from './EditItem'
import { SendEmailAction } from 'types/scriptTypes'

type Props = {
  action: SendEmailAction
  position: number
}

const Menu: React.FunctionComponent<Props> = ({ action, position }) => {
  return (
    <>
      <EditItem action={action} position={position} />
      <DeleteItem position={position} />
    </>
  )
}

export default Menu
