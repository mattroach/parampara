import React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'store/rootReducer'
import { loadProgressFromServer, initPreviewProgress, MESSAGE_BASE_DELAY } from 'store/slices/sessionProgress'
import BotMessage from './item-types/BotMessage'
import HumanBubble from './item-types/HumanBubble'
import TextInput from './action-types/TextInput'

type State = {
  askEmail: boolean
  email?: string
}

type Props = {
  isPreviewMode: boolean
} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

class UserIdentification extends React.Component<Props, State> {
  state: State = {
    askEmail: false
  }

  componentDidMount() {
    if (this.props.allowAnon) {
      this.initProgress()
    } else {
      setTimeout(() => {
        this.setState({ askEmail: true })
      }, MESSAGE_BASE_DELAY)
    }
  }

  onSubmit = (email: string) => {
    this.setState({ email, askEmail: false })
    this.initProgress(email)
  }

  initProgress = (email?: string) => {

    //TODO this could be better. The loading of progress from the server may already take time, so silly to delay double
    setTimeout(() => {
      if (this.props.isPreviewMode)
        this.props.initPreviewProgress()
      else
        this.props.loadProgressFromServer(this.props.scriptId, email)
    }, MESSAGE_BASE_DELAY / 2) // TODO just divide by 2 to estimate the response from the server
  }

  render() {
    if (this.props.allowAnon)
      return null

    const { email } = this.state

    return (
      <>
        <BotMessage message="Hello! Please enter your email to get started." />
        {this.state.askEmail && <TextInput placeholder="Type email" onSubmit={this.onSubmit} />}
        {email && <HumanBubble message={email} />}
      </>
    )
  }
}

function mapStateToProps(state: RootState) {
  const { script } = state.scriptStore

  if (!script)
    throw new Error('Script should be loaded')

  return { allowAnon: script.allowAnon, scriptId: script.id }
}

const mapDispatchToProps = { loadProgressFromServer, initPreviewProgress }

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(UserIdentification)