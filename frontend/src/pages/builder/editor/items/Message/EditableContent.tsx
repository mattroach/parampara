import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { updateItem } from 'store/slices/script'
import { MessageItem } from 'types/scriptTypes'
import { NestedBubbleFieldBase } from '../styles'
import styled from 'styled-components'

const StyledTextarea = styled(NestedBubbleFieldBase)`
  width: 100%;
  display: block;
`

const Content = styled.div`
  display: inline-block;
`
const InlineForm = styled(Form)`
  width: 374px;
  display: inline-block;
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

class EditableContent extends React.Component<Props, State> {
  contentRef: React.RefObject<HTMLDivElement> = React.createRef()
  state = {
    editMode: false,
    messageDraft: '',
    messageDraftHeight: 0
  }

  edit = () => {
    if (this.contentRef.current === null)
      throw new Error('No div found with a height')

    this.setState({
      editMode: true,
      messageDraft: this.props.item.message,
      messageDraftHeight: this.contentRef.current.clientHeight
    })
  }

  submitEdit = (event: any) => {
    event.preventDefault()

    const item: MessageItem = {
      ...this.props.item,
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
      <>
        {this.state.editMode
          ? <InlineForm onSubmit={this.submitEdit}>
            <StyledTextarea
              as="textarea"
              value={this.state.messageDraft}
              onChange={this.handleMessageChange}
              onBlur={this.submitEdit}
              onKeyPress={this.handleKeyPress}
              rows={Math.round(this.state.messageDraftHeight / 20.0)}
              autoFocus />
          </InlineForm>
          : <Content onClick={this.edit} ref={this.contentRef}>
            {item.message}
          </Content>
        }
      </>
    )
  }
}

const mapDispatchToProps = { updateItem }

// @ts-ignore
export default connect(null, mapDispatchToProps)(EditableContent)