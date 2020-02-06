import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { updateItem } from '../../../../store/slices/script';
import { MessageItem, ScriptItemType } from '../../../../types/scriptTypes';
import Positioned from './components/Positioned';
import { BotBubble, EditField } from './styles';

//import ChatContextMenu from './ChatContextMenu'

const ItemWrap = styled.div`
  margin: 10px 0;
`

type State = {
  editMode: boolean
  messageDraft: string
  messageDraftHeight: number
}

type Props = {
  item: MessageItem
  position: number
} & typeof mapDispatchToProps

class Message extends React.Component<Props, State> {
  bubbleRef: React.RefObject<HTMLDivElement> = React.createRef()
  state = {
    editMode: false,
    messageDraft: '',
    messageDraftHeight: 0
  }

  edit = () => {
    if (this.bubbleRef.current === null)
      throw new Error('No div found with a height')

    this.setState({
      editMode: true,
      messageDraft: this.props.item.message,
      messageDraftHeight: this.bubbleRef.current.clientHeight
    })
  }

  submitEdit = (event: any) => {
    event.preventDefault()

    const item: MessageItem = {
      type: ScriptItemType.Message,
      message: this.state.messageDraft
    }

    this.props.updateItem(this.props.position, item)

    this.setState({ editMode: false })
  };

  handleMessageChange = (event: any) => {
    this.setState({ messageDraft: event.target.value })
  };

  handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      this.submitEdit(event)
    }
  }

  render() {
    const { position, item } = this.props

    return (
      <Positioned position={position}>
        <ItemWrap>
          {this.state.editMode
            ? <Form onSubmit={this.submitEdit} className="Inline">
              <EditField
                as="textarea"
                value={this.state.messageDraft}
                onChange={this.handleMessageChange}
                onBlur={this.submitEdit}
                onKeyPress={this.handleKeyPress}
                rows={Math.round((this.state.messageDraftHeight - 14) / 22.0)}
                autoFocus />
            </Form>
            : <BotBubble onClick={this.edit} ref={this.bubbleRef}>
              {/* <ChatContextMenu onEdit={this.edit} container={this.bubbleRef} onEditNav={() => null} /> */}
              {item.message}
            </BotBubble>
          }
        </ItemWrap>
      </Positioned>
    )
  }
}

const mapDispatchToProps = { updateItem }

// @ts-ignore
export default connect(null, mapDispatchToProps)(Message)