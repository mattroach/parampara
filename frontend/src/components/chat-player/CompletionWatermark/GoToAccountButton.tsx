import React from 'react'
import Button from './Button'
import { useHistory } from 'react-router-dom'

type Props = {
  userId: string
}

const GoToAccountButton: React.FunctionComponent<Props> = ({ userId }) => {
  const history = useHistory()
  const onClick = () => {
    history.push(`/u/${userId}`)
  }
  return <Button onClick={onClick}>Go to my account</Button>
}

export default GoToAccountButton
