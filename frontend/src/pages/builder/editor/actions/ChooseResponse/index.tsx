import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { appendResponseOption } from 'store/slices/script'
import styled from 'styled-components'
import { ChooseResponseAction } from 'types/scriptTypes'
import ResponseOption from './ResponseOption'
import { BubbleFieldBase } from '../../items/styles'

export const ResponseEditField = styled(BubbleFieldBase)`
  border: 1px solid rgba(0, 107, 250, .6);
  color: #006bfa;
  display: inline-block;  
  width: 70px;

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

const ItemWrap = styled.div`
  margin: 20px 0;
  text-align: right;
`

const InlineForm = styled(Form)`
  display: inline;
`

type State = {
  responseDraft: string
}

type Props = {
  action: ChooseResponseAction
  position: number
} & typeof mapDispatchToProps

class ChooseResponse extends React.Component<Props, State> {
  state = {
    responseDraft: '',
  }

  submitNewResponse = (event: any) => {
    event.preventDefault()

    if (!this.state.responseDraft)
      return

    this.props.appendResponseOption(this.props.position, this.state.responseDraft)

    this.setState({ responseDraft: '' })
  }

  handleResponseChange = (e: any) => {
    this.setState({ responseDraft: e.target.value })
  };

  render() {
    const { action, position } = this.props
    return (
      <ItemWrap>
        <InlineForm onSubmit={this.submitNewResponse}>
          <ResponseEditField
            type="text"
            placeholder="Add..."
            value={this.state.responseDraft}
            onChange={this.handleResponseChange}
            onBlur={this.submitNewResponse} />
        </InlineForm>

        {action.responses.map((response, i) => {
          return <ResponseOption key={i} position={position} responsePosition={i} response={response} />
        })}

      </ItemWrap>
    )
  }
}

const mapDispatchToProps = { appendResponseOption }

// @ts-ignore
export default connect(null, mapDispatchToProps)(ChooseResponse)