import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { removeAction } from 'store/slices/script'

type Props = {
  position: number
}

const DeleteItem: React.FunctionComponent<Props> = ({ position }) => {
  const dispatch = useDispatch()
  const deleteItem = () => dispatch(removeAction(position))

  return (
    <Dropdown.Item as="button" onClick={deleteItem}>Delete</Dropdown.Item>
  )
}

export default DeleteItem