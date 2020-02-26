import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { updateResponseOption, removeResponseChoice } from 'store/slices/script'
import AutosizeInput from 'react-input-autosize'

import styled from 'styled-components'

export const ResponseEditField = styled(AutosizeInput)`
  input {
    color: #006bfa;
    display: inline-block;
    border: none;
    padding: 0;
    height: auto; 
    outline: none;

    :focus {
      color: #006bfa;
      outline: none;
      box-shadow: none;
    }
    ::placeholder {
      color: #006bfa;
      opacity: .6;
    }
  }
`

const InlineForm = styled(Form)`
  display: inline;
`

type State = {
  responseDraft: string
}

type Props = {
  message: string
  position: number
  responsePosition: number
} & typeof mapDispatchToProps

class InlineEdit extends React.Component<Props, State> {
  inputRef: HTMLInputElement | null = null
  state = {
    responseDraft: this.props.message
  }

  onSubmit = (event: any) => {
    event.preventDefault()

    this.inputRef?.blur()
  }

  submitChange = (event: any) => {
    event.preventDefault()
    const { position, responsePosition, updateResponseOption, removeResponseChoice } = this.props
    const { responseDraft } = this.state

    if (responseDraft) {
      updateResponseOption({ position, responsePosition, newMsg: responseDraft })
    } else {
      removeResponseChoice({ position, responsePosition })
    }
  }

  handleChange = (e: any) => {
    this.setState({ responseDraft: e.target.value })
  };

  render() {
    return (

      <InlineForm onSubmit={this.onSubmit}>
        <ResponseEditField
          inputRef={ref => (this.inputRef = ref)}
          type="text"
          placeholder="Edit..."
          value={this.state.responseDraft}
          onChange={this.handleChange}
          onBlur={this.submitChange} />
      </InlineForm>
    )
  }
}

const mapDispatchToProps = { updateResponseOption, removeResponseChoice }

// @ts-ignore
export default connect(null, mapDispatchToProps)(InlineEdit)