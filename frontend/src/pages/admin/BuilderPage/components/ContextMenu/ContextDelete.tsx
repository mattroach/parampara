import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { removeItem } from 'store/slices/script'

type Props = {
  position: number
}

const ContextDelete: React.FunctionComponent<Props> = ({ position }) => {
  const dispatch = useDispatch()
  const deleteItem = () => dispatch(removeItem(position))

  return (
    <Dropdown.Item as="button" onClick={deleteItem}>Delete</Dropdown.Item>
  )
}

export default ContextDelete