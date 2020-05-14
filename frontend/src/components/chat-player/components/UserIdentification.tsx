import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'
import {
  initPreviewProgress,
  loadProgressFromServer,
  MESSAGE_BASE_DELAY
} from 'store/slices/sessionProgress'
import EmailInput from './action-types/EmailInput'
import BotMessage from './item-types/BotMessage'
import HumanBubble from './item-types/HumanBubble'

type State = {
  askEmail: boolean
  email?: string
}

type Props = {
  isPreviewMode: boolean
} & ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

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
    setTimeout(() => {
      if (this.props.isPreviewMode) {
        this.props.initPreviewProgress()
      } else {
        this.props.loadProgressFromServer(this.props.scriptId, email)
      }
    }, MESSAGE_BASE_DELAY / 2) // divide by 2 as the server request time will add additional wait
  }

  render() {
    if (this.props.allowAnon) return null

    const { email } = this.state

    return (
      <>
        <BotMessage message="Hello! Please enter your email to get started." />
        {this.state.askEmail && <EmailInput onSubmit={this.onSubmit} />}
        {email && <HumanBubble message={email} />}
      </>
    )
  }
}

function mapStateToProps(state: RootState) {
  const { script } = state.scriptStore
  return { allowAnon: script!.allowAnon, scriptId: script!.id }
}

const mapDispatchToProps = { loadProgressFromServer, initPreviewProgress }

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(UserIdentification)
