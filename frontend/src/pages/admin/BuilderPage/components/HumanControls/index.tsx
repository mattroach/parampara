import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { addAction } from 'store/slices/script'
import styled from 'styled-components'
import { ChooseResponseAction, ScriptActionType } from 'types/scriptTypes'
import MessageSubmitButton from '../MessageSubmitButton'
import MessageField from '../MessageField'
import AddAction from './AddAction'

const StyledForm = styled(Form)`
  float: right;
  button {
    vertical-align: top;
  }
`

type State = {
  responseDraft: string
}

type Props = {
  onAddItem?: () => void
} & typeof mapDispatchToProps

class HumanControls extends React.Component<Props, State> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  state = {
    responseDraft: ''
  }

  submitNewResponse = (event?: any) => {
    event && event.preventDefault()
    const { responseDraft: message } = this.state

    if (!message) return

    const action: ChooseResponseAction = {
      type: ScriptActionType.ChooseResponse,
      responses: [{ message }]
    }

    this.props.addAction({ action })

    this.setState({ responseDraft: '' })
    this.props.onAddItem && this.props.onAddItem()
  }

  handleResponseChange = (responseDraft: string) => {
    this.setState({ responseDraft })
  }

  render() {
    const { responseDraft } = this.state
    return (
      <StyledForm onSubmit={this.submitNewResponse}>
        <MessageField
          inputRef={this.inputRef}
          theme="response"
          value={responseDraft}
          onChange={this.handleResponseChange}
          onSubmit={this.submitNewResponse}
          onBlur={this.submitNewResponse}
        />
        {responseDraft ? <MessageSubmitButton color="#0076ff" /> : <AddAction />}
      </StyledForm>
    )
  }
}

const mapDispatchToProps = { addAction }

export default connect(null, mapDispatchToProps)(HumanControls)
