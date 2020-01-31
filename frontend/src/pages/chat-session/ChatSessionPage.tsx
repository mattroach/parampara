import React from 'react';
import { connect } from 'react-redux';

import * as styles from './ChatSessionPage.styles';
import { RootState } from '../../store/rootReducer';
import ProgressedItem from './components/ProgressedItem';
import NextItem from './components/NextItem';
import { loadScript } from '../../store/slices/script'
import UserIdentification from './components/UserIdentification';

type State = {

};

type Props = {
  loadScript: typeof loadScript;
  scriptId: string;
} & ReturnType<typeof mapStateToProps>;

class ChatSessionPage extends React.Component<Props, State> {

  componentDidMount() {
    this.props.loadScript(this.props.scriptId);
  }

  render() {
    const { progress, nextItem, currentItemProcessed, scriptLoaded} = this.props;

    if (!scriptLoaded) {
      return <styles.Wrapper></styles.Wrapper>
    }

    const showNextItem = nextItem && progress && !currentItemProcessed

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
  const { progress, currentItemProcessed } = state.sessionProgressStore;
  const { script } = state.scriptStore;

  let nextItem;
  if (script && progress) {
    nextItem = script.content.items[progress.currentItemId]
  }

  return { progress, nextItem, currentItemProcessed, scriptLoaded: !!script }
}

// @ts-ignore
export default connect(mapStateToProps, { loadScript })(ChatSessionPage)