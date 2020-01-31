import React from 'react'
import styled from 'styled-components';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
  content: string
}
type Props = {
  placeholder: string
  onSubmit: (content: string) => void
};

class TextInput extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      content: ''
    }
  }

  updateContent = (event: any) => {
    event.preventDefault();

    this.setState({content: event.target.value})
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    
    this.props.onSubmit(this.state.content);
  }

  render() {
    return (
      <Wrapper>
        <Form inline={true} onSubmit={this.handleSubmit}>
          <MessageInput placeholder={this.props.placeholder} onChange={this.updateContent} autoFocus />
          <GoButton variant="primary" type="submit">Go</GoButton>
        </Form>
      </Wrapper>
    );
  }
}

export default TextInput