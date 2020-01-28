import React from 'react'
import styled from 'styled-components';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { connect } from 'react-redux';
import { progressItemOnTimer } from '../../../../store/slices/sessionProgress';
import { CommentItem } from '../../../../types/scriptTypes';
import ItemWrap from './ItemWrap';

const Wrapper = styled(ItemWrap)`
  margin: 40px 0;
`;

const GoButton = styled(Button)`
  border-radius: 100%;
  background-color: #777;
  border: 1px solid #999;
  font-size: 12px;

  width: 30px;
  height: 30px;
  padding: 0; 
`;

const MessageInput = styled(Form.Control)`
  border: none;
  border-bottom: 1px solid #888;
  border-radius: 0;

  :focus {
    box-shadow: none;
  }
`;

type State = {
  message: string;
}
type Props = {
  item: CommentItem;
  progressItemOnTimer: typeof progressItemOnTimer;
};

class Comment extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      message: ''
    }
  }

  updateMessage = (event: any) => {
    this.setState({message: event.target.value})
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    
    const { item } = this.props;

    this.props.progressItemOnTimer({
      type: item.type,
      progress: { content: this.state.message },
      item
    });

  }

  render() {
    return (
      <Wrapper>
        <Form inline={true} onSubmit={this.handleSubmit}>
          <MessageInput placeholder="Your comment" onChange={this.updateMessage} autoFocus />
          <GoButton variant="primary" type="submit">Go</GoButton>
        </Form>
      </Wrapper>
    );
  }
}

// @ts-ignore
export default connect(null, {progressItemOnTimer})(Comment)