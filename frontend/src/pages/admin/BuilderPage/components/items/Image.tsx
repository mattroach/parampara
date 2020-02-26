import React from 'react'
import styled from 'styled-components'
import { ImageItem } from 'types/scriptTypes'
import ItemTemplate from './components/ItemTemplate'

const StyledImage = styled.img`
  border-radius: 15px;
`

type Props = {
  item: ImageItem
  position: number
}

const Image: React.FunctionComponent<Props> = ({ position, item }) => {
  return (
    <ItemTemplate position={position} item={item}>
      <StyledImage src={item.url} width={item.width} height={item.height} alt={item.title} />
    </ItemTemplate>
  )
}

export default Image
