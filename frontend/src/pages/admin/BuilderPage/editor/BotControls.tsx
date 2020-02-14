import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { addItem } from 'store/slices/script'
import { MessageItem, ScriptItemType } from 'types/scriptTypes'
import InlineIconButton from './InlineIconButton'
import { EditField } from './items/styles'

const StyledForm = styled(Form)`
  display: inline;
`

const AddMessageControl = styled(EditField)`
  display: inline-block;
  width: 260px;
 
  :focus {
    width: 340px;
  }
`

type State = {
  messageDraft: string
}

type Props = {
  autoFocus?: boolean
  insertPosition?: number
  onAddItem?: () => void
  onBlur?: () => void
} & typeof mapDispatchToProps

class BotControls extends React.Component<Props, State> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  state = {
    messageDraft: '',
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => {
        this.inputRef.current?.focus()
      }, 1) // This is a hack. The menu onclick seems to steal focus, this gets around that
    }
  }

  submitNewBotMessage = (event: any) => {
    event.preventDefault()
    const { addItem, onAddItem, insertPosition } = this.props

    const item: MessageItem = {
      type: ScriptItemType.Message,
      message: this.state.messageDraft
    }

    addItem(item, insertPosition)

    this.setState({ messageDraft: '' })
    onAddItem && onAddItem()
  }

  handleMessageChange = (e: any) => {
    this.setState({ messageDraft: e.target.value })
  };

  render() {
    return (
      <StyledForm onSubmit={this.submitNewBotMessage}>
        <AddMessageControl
          ref={this.inputRef}
          type="text"
          placeholder="Add a message..."
          value={this.state.messageDraft}
          onChange={this.handleMessageChange}
          onBlur={this.props.onBlur} />
        <InlineIconButton tooltip="Choose a gif" icon="gif" />
      </StyledForm>
    )
  }
}

const mapDispatchToProps = { addItem }

// @ts-ignore
export default connect(null, mapDispatchToProps)(BotControls)

