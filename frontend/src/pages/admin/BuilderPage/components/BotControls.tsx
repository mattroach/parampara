import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { addItem } from 'store/slices/script'
import styled from 'styled-components'
import { MessageItem, ScriptItemType } from 'types/scriptTypes'
import GiphyButton from './GiphyButton'
import { EditField } from './items/styles'
import MessageSubmitButton from './MessageSubmitButton'

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
  message: string
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
    message: ''
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
    if (
      this.containerRef.current &&
      !this.containerRef.current.contains(event.target as any)
    ) {
      this.props.onBlur!()
    }
  }

  submitNewBotMessage = (event: any) => {
    event.preventDefault()
    const { addItem, onAddItem, insertPosition } = this.props
    const { message } = this.state

    if (!message) return

    const item: MessageItem = { type: ScriptItemType.Message, message }

    addItem({ item, position: insertPosition })

    this.setState({ message: '' })
    onAddItem && onAddItem()
  }

  handleMessageChange = (e: any) => {
    this.setState({ message: e.target.value })
  }

  render() {
    const { message } = this.state
    return (
      <Wrapper ref={this.containerRef}>
        <StyledForm onSubmit={this.submitNewBotMessage}>
          <AddMessageControl
            ref={this.inputRef}
            type="text"
            placeholder="Add a message..."
            value={message}
            onChange={this.handleMessageChange}
            onBlur={this.submitNewBotMessage}
            autoFocus={this.props.autoFocus}
          />
        </StyledForm>
        {message ? (
          <MessageSubmitButton />
        ) : (
          <GiphyButton
            container={this.containerRef}
            insertPosition={this.props.insertPosition}
            onAddItem={this.props.onAddItem}
          />
        )}
      </Wrapper>
    )
  }
}

const mapDispatchToProps = { addItem }

export default connect(null, mapDispatchToProps)(BotControls)
