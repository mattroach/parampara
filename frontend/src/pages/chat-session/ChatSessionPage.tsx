import React from 'react';
import { connect } from 'react-redux';

import * as styles from './ChatSessionPage.styles';
import { RootState } from '../../store/rootReducer';
import ProgressedItem from './components/ProgressedItem';
import NextItem from './components/NextItem';
import {loadScript} from '../../store/slices/script'

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
    const { sessionProgress, nextItem, scriptId } = this.props;

    const showNextItem = nextItem && !sessionProgress.currentItemProcessed

    return (
      <styles.Wrapper>
        {sessionProgress.items.map((itemProgress, i) => <ProgressedItem key={i} itemProgress={itemProgress} />)}
        {showNextItem && <NextItem item={nextItem} />}
      </styles.Wrapper>
    )
  }
}

function mapStateToProps(state: RootState) {
  const { sessionProgress, script } = state;

  return {
    sessionProgress,
    nextItem: script.items[sessionProgress.currentItemId]
  }
}

// @ts-ignore
export default connect(mapStateToProps, {loadScript})(ChatSessionPage)