import React, { useRef } from 'react'
import styled from 'styled-components'
import { MessageItem } from 'types/scriptTypes'
import Positioned from '../components/Positioned'
import { BubbleBase, NavId } from '../styles'
import EditableContent from './EditableContent'
import Menu from './Menu'

const BotBubble = styled(BubbleBase)`
  max-width: 400px;
  background-color: #efefef;
  color: black;
  display: inline-block;
  transition: box-shadow 0.15s ease-in-out;

  :focus-within {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); 
  }
`

const StyledPositioned = styled(Positioned)`
  margin: 10px 0;
`

type Props = {
  item: MessageItem
  position: number
}

const Message: React.FunctionComponent<Props> = ({ position, item }) => {
  const containerRef = useRef(null)

  return (
    <StyledPositioned position={position}>
      <BotBubble ref={containerRef}>
        <Menu position={position} item={item} containerRef={containerRef} />
        <EditableContent position={position} item={item} />
        {item.nextId ? <NavId>{item.nextId}</NavId> : null}
      </BotBubble>
    </StyledPositioned>
  )
}

export default Message
