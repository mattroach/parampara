import React from 'react'
import styled from 'styled-components'

import { ChooseResponseAction, ScriptActionType, ScriptItem } from 'types/scriptTypes'

import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import ItemWrap from '../item-types/ItemWrap'

const Wrapper = styled(ItemWrap).attrs(props => ({
  unlimitedWidth: true
}))`
  margin: 30px 0;
  text-align: center;
  width: 100%;
`

const ResponseButton = styled(Button)`
  border-radius: 15px;
  padding: 7px 15px;
  line-height: 1.3;
  
  border-color: #006bfa;
  color: #006bfa;
  box-shadow: 0px 2px 6px #d9d9d9;
  margin: 4px 8px 4px 0;

  :hover, :active, :visited {
    text-decoration: none;
    color: #006bfa;
  }
`

type Props = {
  item: ScriptItem
  action: ChooseResponseAction
  progressItemAndDelayNext: typeof progressItemAndDelayNext
}

class ChooseResponse extends React.Component<Props> {
  containerRef: React.RefObject<HTMLDivElement> = React.createRef()

  componentDidMount() {
    this.containerRef.current!.scrollIntoView({ behavior: 'smooth' })
  }

  handleClick = (choice: number) => (event: any) => {
    event.preventDefault()

    const { item } = this.props

    this.props.progressItemAndDelayNext({
      actionResult: {
        type: ScriptActionType.ChooseResponse,
        choice
      },
      item
    })
  }

  render() {
    return (
      <Wrapper ref={this.containerRef}>
        {this.props.action.responses.map((response, i) =>
          <ResponseButton key={i} variant="link" onClick={this.handleClick(i)}>{response.message}</ResponseButton>
        )}
      </Wrapper>
    )
  }
}

// @ts-ignore
export default connect(null, { progressItemAndDelayNext })(ChooseResponse)