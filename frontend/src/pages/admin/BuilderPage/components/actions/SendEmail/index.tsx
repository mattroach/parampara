import React from 'react'
import Widget from '../../items/Widget'
import Menu from './Menu'
import { SendEmailAction } from 'types/scriptTypes'

type Props = {
  action: SendEmailAction
  position: number
}

const SendEmail: React.FunctionComponent<Props> = ({ action, position }) => {
  return (
    <Widget icon="email" title="Email a document">
      <Menu action={action} position={position} />
    </Widget>
  )
}

export default SendEmail
