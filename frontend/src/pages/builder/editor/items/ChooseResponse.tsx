import React from 'react'
import Form from 'react-bootstrap/Form'
import { ChooseResponseItem } from '../../../../types/scriptTypes'
import styled from 'styled-components'
import { ResponseEditField, ResponseBubble, NavId } from './styles'

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
  item: ChooseResponseItem
  // appendResponseOption: (option: string) => void
  // editNav: (i: number) => (newVal: number) => void
}

class ChooseResponse extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      responseDraft: '',
    }
  };

  submitNewResponse = (event: any) => {
    event.preventDefault()

    //this.props.appendResponseOption(this.state.responseDraft)

    this.setState({ responseDraft: '' })
  }

  handleResponseChange = (e: any) => {
    this.setState({ responseDraft: e.target.value })
  };

  render() {
    const { item } = this.props
    return (
      <ItemWrap>
        <InlineForm onSubmit={this.submitNewResponse}>
          <ResponseEditField
            type="text"
            placeholder="Add..."
            value={this.state.responseDraft}
            onChange={this.handleResponseChange}
            autoFocus />
        </InlineForm>

        {item.responses.map((response, i) => {
          const bubbleRef: React.RefObject<HTMLDivElement> = React.createRef()
          return (
            <ResponseBubble key={i} ref={bubbleRef} >
              {/* <ChatContextMenu onEdit={() => null} container={bubbleRef} onEditNav={this.props.editNav(i)} navigation={option.navigation} /> */}
              {response.message}
              {response.nextId ? <NavId>{response.nextId}</NavId> : null}
            </ResponseBubble>
          )
        })}
     
      </ItemWrap>
    )
  }
}
export default ChooseResponse