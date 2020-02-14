import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'
import styled from 'styled-components'
import { updateTitle } from 'store/slices/script'

const StyledTitle = styled(Form.Control)`
  width: 100%;
  border: none;
  background-color: transparent;
`

type State = {
  value: string
}

type Props = {
} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

class Title extends React.Component<Props, State> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  state = {
    value: this.props.title
  }

  onChange = (event: any) => {
    this.setState({ value: event.target.value })
  }

  saveChanges = () => {
    this.props.updateTitle(this.props.scriptId, this.state.value)
  }

  onSubmit = (event: any) => {
    event.preventDefault()
    this.inputRef.current?.blur()
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <StyledTitle
          ref={this.inputRef}
          size="lg"
          placeholder="Script title"
          value={this.state.value}
          onBlur={this.saveChanges}
          onChange={this.onChange}
          autoFocus={!this.state.value}
        />
      </Form>
    )
  }
}

function mapStateToProps(state: RootState) {
  const { script } = state.scriptStore

  if (!script)
    throw Error('Script not loaded')

  return { scriptId: script.id, title: script.title }
}

const mapDispatchToProps = { updateTitle }

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Title)