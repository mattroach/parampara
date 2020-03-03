import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { addItem } from 'store/slices/script'
import styled from 'styled-components'
import { MessageItem, ScriptItemType } from 'types/scriptTypes'
import GiphyButton from './GiphyButton'
import MessageField from './MessageField'
import MessageSubmitButton from './MessageSubmitButton'

const Wrapper = styled.div`
  display: inline-block;
`

const StyledForm = styled(Form)`
  display: inline;
`

const AddMessageControl = styled(MessageField)`
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
  inputRef: React.RefObject<HTMLTextAreaElement> = React.createRef()
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

  submitNewBotMessage = (e?: any) => {
    e?.preventDefault()
    const { addItem, onAddItem, insertPosition } = this.props
    const { message } = this.state

    if (!message) return

    const item: MessageItem = { type: ScriptItemType.Message, message }

    addItem({ item, position: insertPosition })

    this.setState({ message: '' })
    onAddItem && onAddItem()
  }

  handleMessageChange = (message: string) => {
    this.setState({ message })
  }

  render() {
    const { message } = this.state
    return (
      <Wrapper ref={this.containerRef}>
        <StyledForm onSubmit={this.submitNewBotMessage}>
          <AddMessageControl
            inputRef={this.inputRef}
            value={message}
            onChange={this.handleMessageChange}
            onSubmit={this.submitNewBotMessage}
            autoFocus={this.props.autoFocus}
          />
          {message && <MessageSubmitButton />}
        </StyledForm>
        {!message && (
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
