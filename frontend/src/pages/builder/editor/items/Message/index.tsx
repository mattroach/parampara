import React from 'react'
import { connect } from 'react-redux'
import { updateItem } from 'store/slices/script'
import styled from 'styled-components'
import { MessageItem } from 'types/scriptTypes'
import Positioned from '../components/Positioned'
import { NavId, BubbleBase } from '../styles'
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

type State = {
}

type Props = {
  item: MessageItem
  position: number
} & typeof mapDispatchToProps

class Message extends React.Component<Props, State> {

  render() {
    const { position, item } = this.props

    return (
      <StyledPositioned position={position}>
        <BotBubble>
          <Menu position={position} item={item} />
          <EditableContent position={position} item={item} />
          {item.nextId ? <NavId>{item.nextId}</NavId> : null}
        </BotBubble>
      </StyledPositioned>
    )
  }
}

const mapDispatchToProps = { updateItem }

// @ts-ignore
export default connect(null, mapDispatchToProps)(Message)