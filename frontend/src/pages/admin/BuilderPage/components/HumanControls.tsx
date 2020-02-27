import MaterialIcon from 'material-icons-react'
import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { addAction } from 'store/slices/script'
import styled from 'styled-components'
import {
  ChooseResponseAction,
  CommentAction,
  ScriptActionType
} from '../../../../types/scriptTypes'
import { ResponseAddField } from './items/styles'

const StyledForm = styled(Form)`
  float: right;
  button {
    vertical-align: top;
  }
`
const IconButton = styled(DropdownButton)`
  display: inline;
  button {
    opacity: 0.9;
    vertical-align: top;
    padding: 0;
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
} & typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>

class HumanControls extends React.Component<Props, State> {
  state = {
    responseDraft: ''
  }

  submitNewResponse = (event: any) => {
    event.preventDefault()
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

  handleResponseChange = (e: any) => {
    this.setState({ responseDraft: e.target.value })
  }

  showAddResponse() {
    return !this.props.lastItemHasAction
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
    if (!this.showAddResponse()) return null

    return (
      <StyledForm onSubmit={this.submitNewResponse}>
        <ResponseAddField
          type="text"
          placeholder="Add a response..."
          value={this.state.responseDraft}
          onChange={this.handleResponseChange}
          onBlur={this.submitNewResponse}
        />
        <IconButton
          id="widgets"
          variant="link"
          title={<MaterialIcon icon="add_circle" size={35} color="#0076ff" />}
        >
          <Dropdown.Item href="#" onClick={this.addWidget('comment', 'Collect a comment')}>
            Collect a comment
          </Dropdown.Item>
          {/* <Dropdown.Item href="#" onClick={this.addWidget('email', 'Email a document')}>Send a document</Dropdown.Item> */}
        </IconButton>
      </StyledForm>
    )
  }
}

const mapDispatchToProps = { addAction }

function mapStateToProps(state: RootState) {
  const { script } = state.scriptStore
  if (!script) throw new Error('No script')

  const lastItem = script.version.items[script.version.items.length - 1]
  return {
    lastItemHasAction: lastItem && lastItem.action !== undefined
  }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(HumanControls)
