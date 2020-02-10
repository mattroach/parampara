import React from 'react'
import Widget from '../../items/Widget'
import Menu from './Menu'

type Props = {
  position: number
}

const Comment: React.FunctionComponent<Props> = ({ position }) => {

  return (
    <Widget icon="comment" title="Collect a comment">
      <Menu position={position} />
    </Widget>
  )
}

export default Comment