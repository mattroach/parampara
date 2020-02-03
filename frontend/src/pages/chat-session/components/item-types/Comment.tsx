import React from 'react'

import { connect } from 'react-redux';
import { progressItemAndDelayNext } from '../../../../store/slices/sessionProgress';
import { CommentItem } from '../../../../types/scriptTypes';
import TextInput from './TextInput';

type State = {
}
type Props = {
  item: CommentItem;
  progressItemAndDelayNext: typeof progressItemAndDelayNext;
};

class Comment extends React.Component<Props, State> {


  handleSubmit = (content: string) => {
    const { item } = this.props;

    this.props.progressItemAndDelayNext({
      type: item.type,
      progress: { content },
      item
    });

  }

  render() {
    return <TextInput placeholder="Your comment" onSubmit={this.handleSubmit} />
  }
}

// @ts-ignore
export default connect(null, {progressItemAndDelayNext})(Comment)