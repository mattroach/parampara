import React from 'react'
import { CommentItem } from 'types/scriptTypes'
import Widget from '../Widget'
import Menu from './Menu'

type Props = {
  item: CommentItem
  position: number
}

const Comment: React.FunctionComponent<Props> = ({ item, position }) => {

  return (
    <Widget icon="comment" title="Collect a comment">
      <Menu position={position} />
    </Widget>
  )
}

export default Comment