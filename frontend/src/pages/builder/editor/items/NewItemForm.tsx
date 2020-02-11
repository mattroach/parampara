import React from 'react'
import styled from 'styled-components'
import BotControls from '../BotControls'
import { cancelNewItemForm } from 'store/slices/script'
import { useDispatch } from 'react-redux'

type Props = {
  position: number
}

const NewItemForm: React.FunctionComponent<Props> = ({ position }) => {
  const dispatch = useDispatch()
  const closeForm = () => dispatch(cancelNewItemForm())

  return (
    <BotControls
      insertPosition={position}
      onAddItem={closeForm}
      onBlur={closeForm}
      autoFocus />
  )
}

export default NewItemForm