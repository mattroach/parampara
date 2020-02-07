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
  display: inline-box;
  width: 260px;
 
  :focus {
    width: 340px;
  }
`

type State = {
  messageDraft: string
}

type Props = {
} & typeof mapDispatchToProps

class BotControls extends React.Component<Props, State> {
  state = {
    messageDraft: '',
  }

  submitNewBotMessage = (event: any) => {
    event.preventDefault()

    const item: MessageItem = {
      type: ScriptItemType.Message,
      message: this.state.messageDraft
    }

    this.props.addItem(item)
    this.setState({ messageDraft: '' })
  }

  handleMessageChange = (e: any) => {
    this.setState({ messageDraft: e.target.value })
  };

  render() {
    return (
      <StyledForm onSubmit={this.submitNewBotMessage}>
        <InlineIconButton tooltip="Choose a gif" icon="gif" />
        <AddMessageControl
          type="text"
          placeholder="Add a message..."
          value={this.state.messageDraft}
          onChange={this.handleMessageChange} />
      </StyledForm>
    )
  }
}

const mapDispatchToProps = { addItem }

// @ts-ignore
export default connect(null, mapDispatchToProps)(BotControls)


