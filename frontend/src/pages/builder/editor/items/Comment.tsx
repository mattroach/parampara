import React from 'react'
import styled from 'styled-components'
import Widget from './Widget'
import { CommentItem } from 'types/scriptTypes'

const ItemWrap = styled.div`
`

type Props = {
  item: CommentItem
  position: number
}

const Comment: React.FunctionComponent<Props> = ({ item, position }) => {

  return (
    <Widget icon="comment" title="Collect a comment" />
  )
}

export default Comment