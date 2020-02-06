import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'
import styled from 'styled-components'

const StyledTitle = styled(Form.Control)`
  width: 100%;
  border: none;
  background-color: transparent;
`

type State = {
  value: string
}

type Props = {
} & ReturnType<typeof mapStateToProps>

class Title extends React.Component<Props, State> {
  state = {
    value: this.props.title
  }

  onChange = (event: any) => {
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <StyledTitle
        size="lg"
        placeholder="Script title"
        value={this.state.value}
        onChange={this.onChange} />
    )
  }
}

function mapStateToProps(state: RootState) {
  const { script } = state.scriptStore

  if (!script)
    throw Error('Script not loaded')

  return { title: script.title }
}

// @ts-ignore
export default connect(mapStateToProps, {})(Title)