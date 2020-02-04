import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import AppButton from './AppButton';

type State = {
  isLoading: boolean
}

type Props = {
  adminId: string
} & RouteComponentProps

class CreateScriptButton extends React.Component<Props, State> {
  state = {
    isLoading: false
  }

  onClick = (event: any) => {
    event.preventDefault()
    this.setState({ isLoading: true })

    const { adminId } = this.props

    axios.post('/api/script', { adminId })
      .then((response) => {
        const scriptId = response.data.id
        this.props.history.push(`/builder/${adminId}/${scriptId}`)
      })
  }

  render() {
    const { isLoading } = this.state
    return (
      <AppButton
        variant="secondary"
        isLoading={isLoading}
        onClick={this.onClick}>
        Create a new Parampara
      </AppButton>
    )
  }
}

export default withRouter(CreateScriptButton)