import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { appendResponseOption } from 'store/slices/script'
import styled from 'styled-components'
import { ChooseResponseAction } from 'types/scriptTypes'
import { NavId, ResponseBubble, ResponseEditField } from '../../items/styles'
import Menu from './Menu'

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
  constructor(props: Props) {
    super(props)
    this.state = {
      responseDraft: '',
    }
  };

  submitNewResponse = (event: any) => {
    event.preventDefault()

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
            onChange={this.handleResponseChange} />
        </InlineForm>

        {action.responses.map((response, i) => {
          const bubbleRef: React.RefObject<HTMLDivElement> = React.createRef()
          return (
            <ResponseBubble key={i} ref={bubbleRef} >
              <Menu position={position} responsePosition={i} />
              {response.message}
              {response.nextId ? <NavId>{response.nextId}</NavId> : null}
            </ResponseBubble>
          )
        })}

      </ItemWrap>
    )
  }
}

const mapDispatchToProps = { appendResponseOption }

// @ts-ignore
export default connect(null, mapDispatchToProps)(ChooseResponse)