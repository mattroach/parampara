import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { addAction, appendResponseOption, cancelResponseChoiceForm } from 'store/slices/script'
import styled from 'styled-components'
import { ScriptActionType } from 'types/scriptTypes'
import { BubbleFieldBase } from '../../items/styles'

export const ResponseEditField = styled(BubbleFieldBase)`
  border: 1px solid rgba(0, 107, 250, .6);
  color: #006bfa;
  display: inline-block;  
  width: 70px;
  margin-left: 4px; 

  :focus {
    width: 170px;
    color: #006bfa;
    border: 1px solid rgba(0, 107, 250, 1);
  }
  ::placeholder {
    color: #006bfa;
    opacity: .6;
  }
`

const InlineForm = styled(Form)`
  display: inline;
`

type State = {
  responseDraft: string
  focused: boolean
}

type Props = {
  position: number
  autoFocus?: boolean
  mode: 'create' | 'append'
} & typeof mapDispatchToProps

class ChooseResponse extends React.Component<Props, State> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  state = {
    responseDraft: '',
    focused: false
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => {
        this.inputRef.current?.focus()
      }, 1) // This is a hack. The menu onclick seems to steal focus, this gets around that
    }
  }

  submitNewResponse = (event: any) => {
    event.preventDefault()

    const { position } = this.props
    const option = this.state.responseDraft

    if (this.props.mode === 'append') {
      if (!this.state.responseDraft)
        return

      this.props.appendResponseOption({ position, option })
    } else {
      if (this.state.responseDraft) {
        this.props.addAction({
          action: {
            type: ScriptActionType.ChooseResponse,
            responses: [{ message: option }]
          },
          position
        })
      } else {
        this.props.cancelResponseChoiceForm()
        return
      }
    }

    this.setState({ responseDraft: '' })
  }

  handleResponseChange = (e: any) => {
    this.setState({ responseDraft: e.target.value })
  }

  onBlur = (event: any) => {
    this.setState({ focused: false })
    this.submitNewResponse(event)
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  render() {
    return (
      <InlineForm onSubmit={this.submitNewResponse}>
        <ResponseEditField
          ref={this.inputRef}
          type="text"
          placeholder={this.state.focused ? 'Add a response...' : 'Add...'}
          value={this.state.responseDraft}
          onChange={this.handleResponseChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur} />
      </InlineForm>

    )
  }
}

const mapDispatchToProps = { appendResponseOption, cancelResponseChoiceForm, addAction }

// @ts-ignore
export default connect(null, mapDispatchToProps)(ChooseResponse)