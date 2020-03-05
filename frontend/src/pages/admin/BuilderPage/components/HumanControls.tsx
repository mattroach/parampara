import MaterialIcon from 'material-icons-react'
import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { addAction } from 'store/slices/script'
import styled from 'styled-components'
import { ChooseResponseAction, CommentAction, ScriptActionType } from 'types/scriptTypes'
import MessageSubmitButton from './MessageSubmitButton'
import MessageField from './MessageField'

const StyledForm = styled(Form)`
  float: right;
  button {
    vertical-align: top;
  }
`
const IconButton = styled(DropdownButton)`
  display: inline;
  button {
    width: 40px;
    height: 40px;
    opacity: 0.9;
    vertical-align: top;
    padding: 0;

    transition: box-shadow 0.15s ease-in-out;
    :focus {
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  i {
    vertical-align: middle;
  }
  .dropdown-toggle::after {
    display: none;
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

  addWidget = (icon: string, title: string) => (event: any) => {
    event.preventDefault()

    const action: CommentAction = {
      type: ScriptActionType.Comment
    }

    this.props.addAction({ action })
    this.props.onAddItem && this.props.onAddItem()
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
        {responseDraft ? (
          <MessageSubmitButton color="#0076ff" />
        ) : (
          <IconButton
            id="widgets"
            variant="link"
            title={<MaterialIcon icon="more_horiz" size={30} color="#0076ff" />}
          >
            <Dropdown.Item
              href="#"
              onClick={this.addWidget('comment', 'Collect a comment')}
            >
              Collect a comment
            </Dropdown.Item>
          </IconButton>
        )}
      </StyledForm>
    )
  }
}

const mapDispatchToProps = { addAction }

export default connect(null, mapDispatchToProps)(HumanControls)
