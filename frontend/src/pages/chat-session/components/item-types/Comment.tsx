import React from 'react'
import styled from 'styled-components';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { connect } from 'react-redux';
//import { progressCommentItem } from '../../../../store/slices/sessionProgress';

const Wrapper = styled.div`
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

type Props = {
  //progressCommentItem: typeof progressCommentItem;
};

class Comment extends React.Component<Props, {}> {

  handleSubmit = (event: any) => {
    event.preventDefault();


  }

  render() {
    return (
      <Wrapper>
        <Form inline={true} onSubmit={this.handleSubmit}>
          <MessageInput placeholder="Your comment" autoFocus />
          <GoButton variant="primary" type="submit">Go</GoButton>
        </Form>
      </Wrapper>
    );
  }
}

export default connect(null, {})(Comment)