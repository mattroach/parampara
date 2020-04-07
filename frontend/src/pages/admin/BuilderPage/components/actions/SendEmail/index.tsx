import React from 'react'
import MacroAction from '../MacroAction'
import Menu from './Menu'
import { SendEmailAction } from 'types/scriptTypes'

type Props = {
  action: SendEmailAction
  position: number
}

const SendEmail: React.FunctionComponent<Props> = ({ action, position }) => {
  return (
    <MacroAction icon="email" menu={() => <Menu action={action} position={position} />}>
      Email a document
    </MacroAction>
  )
}

export default SendEmail
