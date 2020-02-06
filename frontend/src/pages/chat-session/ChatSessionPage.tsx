import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { loadScript } from '../../store/slices/script';
import * as styles from './ChatSessionPage.styles';
import NextItem from './components/NextItem';
import ProgressedItem from './components/ProgressedItem';
import UserIdentification from './components/UserIdentification';
import { ScriptVersionType } from '../../api'

type State = {

}

type Props = {
  loadScript: typeof loadScript
  scriptId: string
} & ReturnType<typeof mapStateToProps>

class ChatSessionPage extends React.Component<Props, State> {

  componentDidMount() {
    this.props.loadScript(this.props.scriptId, ScriptVersionType.latest)
  }

  render() {
    const { progress, nextItem, scriptLoaded, currentItemDelaying } = this.props

    if (!scriptLoaded) {
      return <styles.Wrapper></styles.Wrapper>
    }

    const showNextItem = nextItem && progress && !currentItemDelaying

    return (
      <styles.Wrapper>
        <UserIdentification />
        {progress && progress.items.map((itemProgress, i) => <ProgressedItem key={i} itemProgress={itemProgress} />)}
        {showNextItem && nextItem && <NextItem item={nextItem} />}
      </styles.Wrapper>
    )
  }
}

function mapStateToProps(state: RootState) {
  const { progress, currentItemDelaying } = state.sessionProgressStore
  const { script } = state.scriptStore

  let nextItem
  if (script && progress) {
    nextItem = script.version.items[progress.currentItemId]
  }

  return { progress, nextItem, scriptLoaded: !!script, currentItemDelaying }
}

// @ts-ignore
export default connect(mapStateToProps, { loadScript })(ChatSessionPage)