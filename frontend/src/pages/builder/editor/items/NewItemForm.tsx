import React from 'react'
import { useDispatch } from 'react-redux'
import { cancelNewItemForm } from 'store/slices/script'
import BotControls from '../BotControls'

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