import React from 'react'
import MacroAction from '../MacroAction'
import DeleteItem from '../DeleteItem'

type Props = {
  position: number
}

const CollectEmail: React.FunctionComponent<Props> = ({ position }) => {
  return (
    <MacroAction
      icon="email"
      position={position}
      menuItems={() => <DeleteItem position={position} />}
    >
      Collect an email address
    </MacroAction>
  )
}

export default CollectEmail
