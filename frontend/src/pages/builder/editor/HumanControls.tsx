import MaterialIcon from 'material-icons-react';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../store/rootReducer';
import { addItem } from '../../../store/slices/script';
import { ChooseResponseItem, CommentItem, ScriptItemType } from '../../../types/scriptTypes';

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

} & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>

class HumanControls extends React.Component<Props, State> {
  state = {
    responseDraft: '',
  }

  submitNewResponse = (event: any) => {
    event.preventDefault()

    const item: ChooseResponseItem = {
      type: ScriptItemType.ChooseResponse,
      responses: [{ message: this.state.responseDraft }]
    }

    this.props.addItem(item)

    this.setState({ responseDraft: '' })
  }

  handleResponseChange = (e: any) => {
    this.setState({ responseDraft: e.target.value })
  };

  showAddResponse() {
    return this.props.lastItemIsMessage
  }

  addWidget = (icon: string, title: string) => (event: any) => {
    event.preventDefault()

    const item: CommentItem = {
      type: ScriptItemType.Comment
    }

    this.props.addItem(item)
  }

  render() {
    if (!this.showAddResponse())
      return null

    return (
      <StyledForm onSubmit={this.submitNewResponse}>
        <Form.Control
          className="Chat-Bubble-Input Chat-Bubble-Input-Human"
          type="text"
          placeholder="Add a response option..."
          value={this.state.responseDraft}
          onChange={this.handleResponseChange} />
        <DropdownButton id="dropdown-basic-button" variant="link" className="Input-Action Macros" title={<MaterialIcon icon="add_circle" size={35} />}>
          <Dropdown.Item href="#" onClick={this.addWidget('comment', 'Collect a comment')}>Collect a comment</Dropdown.Item>
          {/* <Dropdown.Item href="#" onClick={this.addWidget('email', 'Email a document')}>Send a document</Dropdown.Item> */}
        </DropdownButton>
      </StyledForm>
    )
  }
}

const mapDispatchToProps = { addItem }

function mapStateToProps(state: RootState) {
  const { script } = state.scriptStore
  if (!script)
    throw new Error('No script')

  const lastItem = script.version.items[script.version.items.length - 1]
  return {
    lastItemIsMessage: lastItem.type == ScriptItemType.Message
  }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(HumanControls)