import React, { useRef } from 'react'
import styled from 'styled-components'
import Positioned from './Positioned'
import { BubbleBase, NavId } from '../styles'
import ItemMenu from './ItemMenu'
import { ScriptItem } from 'types/scriptTypes'

const StyledPositioned = styled(Positioned)`
  margin: 10px 0;
`

const StyledNavId = styled(NavId)`
  position: absolute;
  top: 6px;
  margin-left: 6px;
`

type Props = {
  item: ScriptItem
  position: number
}

const ItemTemplate: React.FunctionComponent<Props> = ({ position, item, children }) => {
  const containerRef = useRef(null)

  return (
    <StyledPositioned position={position}>
      <BubbleBase ref={containerRef}>
        <ItemMenu position={position} item={item} containerRef={containerRef} />
        {children}
        {item.nextId ? <StyledNavId>{item.nextId}</StyledNavId> : null}
      </BubbleBase>
    </StyledPositioned>
  )
}

export default ItemTemplate
