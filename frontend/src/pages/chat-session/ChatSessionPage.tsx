import React from 'react';
import { connect } from 'react-redux';

import * as styles from './ChatSessionPage.styles';
import { RootState } from '../../store/rootReducer';
import ProgressedItem from './components/ProgressedItem';
import NextItem from './components/NextItem';

type State = {

};

type Props = ReturnType<typeof mapStateToProps>;

class ChatSessionPage extends React.Component<Props, State> {
  render() {
    const { sessionProgress, nextItem } = this.props;
    return (
      <styles.Wrapper>
        {sessionProgress.items.map((itemProgress, i) => <ProgressedItem key={i} itemProgress={itemProgress} />)}
        <NextItem item={nextItem} />
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

export default connect(mapStateToProps)(ChatSessionPage)