import React from 'react'
import MacroAction from '../MacroAction'
import DeleteItem from '../DeleteItem'

type Props = {
  position: number
}

const Comment: React.FunctionComponent<Props> = ({ position }) => {
  return (
    <MacroAction
      icon="comment"
      position={position}
      menuItems={() => <DeleteItem position={position} />}
    >
      Collect a comment
    </MacroAction>
  )
}

export default Comment
