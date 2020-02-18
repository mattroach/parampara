import React from 'react'
import styled from 'styled-components'
import ItemWrap from './ItemWrap'
import { ImageItem } from 'types/scriptTypes'

const StyledImage = styled.img`
  border-radius: 15px;
  display: inline-block;
`

type Props = {
  item: ImageItem
  disableAnimateIn?: boolean
}

const BotImage: React.FunctionComponent<Props> = ({ item, disableAnimateIn }) => {
  return (
    <ItemWrap disableAnimateIn={disableAnimateIn}>
      <StyledImage src={item.url} width={item.width} height={item.height} alt={item.title} />
    </ItemWrap>
  )
}

export default BotImage