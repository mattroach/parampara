import React from 'react'
import MacroAction from '../MacroAction'
import Menu from './Menu'

type Props = {
  position: number
}

const Comment: React.FunctionComponent<Props> = ({ position }) => {
  return (
    <MacroAction icon="comment" menu={() => <Menu position={position} />}>
      Collect a comment
    </MacroAction>
  )
}

export default Comment
