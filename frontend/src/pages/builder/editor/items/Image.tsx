import React from 'react'
import { ImageItem } from 'types/scriptTypes'
import styled from 'styled-components'

const ItemWrap = styled.div`
`


type Props = {
  item: ImageItem
  position: number
}

const Image: React.FunctionComponent<Props> = ({ item, position }) => {

  return (
    <ItemWrap>
      {item.type}
    </ItemWrap>
  )
}

export default Image