import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { addItem } from 'store/slices/script'
import styled from 'styled-components'
import { MessageItem, ScriptItemType } from 'types/scriptTypes'
import GiphyButton from './GiphyButton'
import { EditField } from './items/styles'

const Wrapper = styled.div`
  display: inline-block;
`

const StyledForm = styled(Form)`
  display: inline;
`

const AddMessageControl = styled(EditField)`
  display: inline-block;
  width: 300px;
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
  containerRef: React.RefObject<HTMLDivElement> = React.createRef()

  state = {
    messageDraft: ''
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => {
        this.inputRef.current?.focus()
      }, 1) // This is a hack. The menu onclick seems to steal focus, this gets around that
    }

    this.props.onBlur && document.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
    this.props.onBlur && document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = (event: MouseEvent) => {
    if (this.containerRef.current && !this.containerRef.current.contains(event.target as any)) {
      this.props.onBlur!()
    }
  }

  submitNewBotMessage = (event: any) => {
    event.preventDefault()
    const { addItem, onAddItem, insertPosition } = this.props
    const { messageDraft: message } = this.state

    if (!message) return

    const item: MessageItem = { type: ScriptItemType.Message, message }

    addItem({ item, position: insertPosition })

    this.setState({ messageDraft: '' })
    onAddItem && onAddItem()
  }

  handleMessageChange = (e: any) => {
    this.setState({ messageDraft: e.target.value })
  }

  render() {
    return (
      <Wrapper ref={this.containerRef}>
        <StyledForm onSubmit={this.submitNewBotMessage}>
          <AddMessageControl
            ref={this.inputRef}
            type="text"
            placeholder="Add a message..."
            value={this.state.messageDraft}
            onChange={this.handleMessageChange}
            onBlur={this.submitNewBotMessage}
          />
          <GiphyButton
            container={this.containerRef}
            insertPosition={this.props.insertPosition}
            onAddItem={this.props.onAddItem}
          />
        </StyledForm>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = { addItem }

// @ts-ignore
export default connect(null, mapDispatchToProps)(BotControls)
