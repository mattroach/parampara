import React from 'react'
import styled from 'styled-components'

import { ChooseResponseItem } from 'types/scriptTypes'

import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import ItemWrap from './ItemWrap'

const Wrapper = styled(ItemWrap)`
  margin: 20px 0;
  text-align: right;
`

const ResponseButton = styled(Button)`
  border-radius: 15px;
  padding: 7px 15px;
  line-height: 1.3;
  
  border-color: #006bfa;
  color: #006bfa;
  box-shadow: 0px 2px 6px #d9d9d9;
  margin-right: 8px;

  :hover, :active, :visited {
    text-decoration: none;
    color: #006bfa;
  }
`

type Props = {
  item: ChooseResponseItem
  progressItemAndDelayNext: typeof progressItemAndDelayNext
}

class ChooseResponse extends React.Component<Props, {}> {

  handleClick = (choice: number) => (event: any) => {
    event.preventDefault()

    const { item } = this.props

    this.props.progressItemAndDelayNext({
      type: item.type,
      progress: { choice },
      item
    })
  }

  render() {
    return (
      <Wrapper>
        {this.props.item.responses.map((response, i) =>
          <ResponseButton key={i} variant="link" onClick={this.handleClick(i)}>{response.message}</ResponseButton>
        )}
      </Wrapper>
    )
  }
}

// @ts-ignore
export default connect(null, { progressItemAndDelayNext })(ChooseResponse)