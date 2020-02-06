import React from 'react'
import { CommentItem } from '../../../../types/scriptTypes'
import styled from 'styled-components'
import Widget from './Widget'

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