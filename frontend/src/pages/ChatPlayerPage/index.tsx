import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { loadScript } from 'store/slices/script'
import { ScriptVersionType } from 'api/types'
import ChatPlayer from 'components/chat-player/ChatPlayer'
import * as styles from './ChatPlayerPage.styles'


type Props = {
  loadScript: typeof loadScript
  scriptId: string
} & ReturnType<typeof mapStateToProps>

class ChatSessionPage extends React.Component<Props> {

  componentDidMount() {
    this.props.loadScript(this.props.scriptId, ScriptVersionType.latest)
  }

  render() {
    const { scriptLoaded } = this.props

    return (
      <styles.Wrapper>
        {scriptLoaded && <ChatPlayer isPreviewMode={false} />}
      </styles.Wrapper>
    )
  }
}

function mapStateToProps(state: RootState) {
  return { scriptLoaded: !!state.scriptStore.script }
}

// @ts-ignore
export default connect(mapStateToProps, { loadScript })(ChatSessionPage)